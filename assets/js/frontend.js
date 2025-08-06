(

	function( $ ) {

		let fieldMap  = {},
		    JetABAF   = {},
		    aborters  = {},
			cache     = new Map(),
			addAction,
			doAction;

		$( window ).on( 'jet-form-builder/after-init', initWatchers );

		$( window ).on( 'jet-form-builder/init', init );

		function init() {

			addAction = window.JetPlugins.hooks.addAction;
			doAction = window.JetPlugins.hooks.doAction;

			addAction(
				'jet.fb.input.makeReactive',
				'jfb-update-field/chain-init',
				function( input ) {
					input.jfbFieldUpdater ??= {};

					setChainWatcher( input );
				}
			);

			addAction(
				'jet.fb.input.makeReactive',
				'jfb-update-field/on-observe',
				function( input ) {

					if ( ! input.path || input.path.length < 2 ) {
						return;
					}
return;
					// if ( input.root.parent && ! input.root.parent.jfbFieldUpdater ) {
					// 	input.root.parent.jfbFieldUpdater = {};
					// 	let originalRemove = input.root.parent.remove.bind( input.root.parent );
					// 	input.root.parent.remove = function ( observableRow ) {
					// 		this.jfbFieldUpdater.isBlocked = true;
					// 		originalRemove( observableRow );
					// 		setTimeout( () => { this.jfbFieldUpdater.isBlocked = false; } );
					// 	};

					// 	console.log( input.root.parent.remove );
					// }
					
					const observable  = input.getRoot(),
					      formId      = observable.form.getFormId(),
						  node        = input.nodes[0],
						  updatedNode = node.closest( '[data-update-field-name]' ),
						  path = input.path;

					setFieldWatcher( formId, input );

				}
			);

			$( window ).off( 'jet-form-builder/init', init );
		}

		$( document ).on( 'jet-form-builder/ajax/on-success', updateAllFields );

		document.querySelectorAll( 'button[data-update-button-name]' ).forEach( function( button ) {
			button.addEventListener( 'click', handleUpdateButton );
		} );

		function handleUpdateButton() {

			const form   = this.closest( 'form' ),
			      formId = form?.dataset?.formId;

			if ( ! formId ) {
				return;
			}

			const buttonName = this.dataset.updateButtonName;

			form.querySelectorAll( `[data-update-on-button="${buttonName}"]` ).forEach( function( updatedNode ) {
				updateFormField( updatedNode, JetFormBuilder[ formId ], this );
			} );

		}

		function initWatchers( initEvent, $scope, observable ) {
return;
			if ( ! observable.rootNode.querySelector( '[data-update-field-name][data-update-listen-to]' ) ) {
				return;
			}

			const formId = observable.form.getFormId();

			if ( window.JetABAFInput ) {

				JetABAF[ formId ] = {};

				observable.rootNode.querySelectorAll( '[data-update-field-name].field-type-check-in-out' ).forEach( function( node ) {
					JetABAF[ formId ][ node.dataset.updateFieldName ] = node.querySelector( '[format]' )?.dataset?.format ?? JetABAFInput.field_format;
				} );

			}

			observable.rootNode.querySelectorAll( '[data-update-field-name]' ).forEach( function( node ) {

				if ( ! node.dataset.updateListenTo ) {
					return;
				}

				fieldMap[ formId ] ??= {};

				node.dataset.updateListenTo
					.split(',')
					.map( ( name => name.replaceAll( ' ', '' ) ) )
					.forEach( function( listened ) {
						fieldMap[ formId ][ listened ] = true;
					} );

			} );

			observable.rootNode.querySelectorAll( '.jfbuf-listing-updater' );

			for ( const key in fieldMap[ formId ] ) {

				const input = observable.getInput( key );

				if ( ! input || ! input.value || input.inputType === "repeater" ) {
					continue;
				}

				setFieldWatcher( formId, input );
				
			}

		}

		function triggerUpdate( input ) {
			input.value.notify();
		}

		function updateAllFields( event, response, $form ) {

			const formId = $form.data( 'form-id' );

			if ( ! fieldMap[ formId ] ) {
				return;
			}

			const observable = JetFormBuilder[ formId ];

			if ( ! observable ) {
				return;
			}

			for ( const key in fieldMap[ formId ] ) {
				
				const input = observable.getInput( key );

				if ( ! input || ! input.value || input.inputType === "repeater" ) {
					continue;
				}

				triggerUpdate( input );
				
			}

		}

		function getFormValues( observable ) {

			if ( observable?.parent?.root ) {
				observable = observable.parent.root;
			}

			const formFields = observable.getInputs(),
			      formId     = observable.form ? observable.form.getFormId() : observable.parent.root.form.getFormId();

			let formValues = {};

			formFields.forEach( function( input ) {

				if ( undefined === input?.value?.current ) {
					return;
				}

				if ( input.inputType === "repeater" ) {
					formValues[ input.name ] = getRepeaterValue( input );
					return;
				}

				formValues[ input.name ] = input.value.current;

				if ( JetABAF[ formId ]?.[ input.name ] ) {
					formValues[ input.name + '_jfbuf_timestamp_array' ] = JetBooking.stringToTimestamp( input.value.current, ' - ', JetABAF[ formId ][ input.name ] );
				}

			} );

			return formValues;

		}

		function getRepeaterValue( input ) {
			
			if ( input?.inputType !== "repeater" || ! input?.value?.current?.length ) {
				return [];
			}

			let result = [];

			input.value.current.forEach( function( observable, i ) {
				observable.getInputs().forEach( function( input ) {
					result[ i ] ??= {};
					result[ i ][ input.name ] = input.value.current;
				} );
			} );

			return result;
		}

		function styleCalculated( updatedCalculated, type = 'add' ) {

			if ( ! updatedCalculated ) {
				return;
			}

			updatedCalculated.forEach( function( calculated ) {
				if ( type === 'add' ) {
					calculated.classList.add( 'jfb-updated-field' );
				} else {
					calculated.classList.remove( 'jfb-updated-field' );
				}
			} );

		}

		function getHash( fieldName, formId, formFields ) {
			try {  
				return formId + fieldName + JSON.stringify( formFields );
			} catch ( e ) {
				return false;
			}
		}

		function updateFieldFromResponse( params, updateCache = false ) {

			const {
				response,
				updated,
				formId,
				updatedNode,
				updatedCalculated,
				updatedInput,
				hash,
				isCached,
			} = params;

			updatedNode.classList.remove( 'jfb-updated-field' );

			styleCalculated( updatedCalculated, 'remove' )

			if ( ! response.type ) {
				throw new Error('Invalid response');
			}

			switch ( response.type ) {

				case 'value':
					updatedInput.value.current = response.value;
					break;
				case 'repeater':
					if ( ! Array.isArray( response.value ) ) {
						break;
					}

					updatedInput.addNew( response.value.length );

					for ( const [ i, item ] of response.value.entries() ) {
						for ( const input of updatedInput.value.current[ i ].getInputs() ) {
							if ( item[ input.name ] ) {
								input.value.current = item[ input.name ];
							}
						}
					}
					break;
				case 'block':

					maybeClearInput( updatedInput );

					let html = $( response.value ).html() || '';
					
					$( updatedNode.querySelector( '.jet-form-builder__fields-group' ) ).html( html );
					
					maybeInitListingTemplate( updatedNode, updatedInput );

					if ( response.isEmpty ) {
						updatedNode.setAttribute( 'data-update-field-is-empty', 'true' );
					 } else {
						updatedNode.setAttribute( 'data-update-field-is-empty', 'false' );
					}

					if ( response.isInner ) {
						ensureInnerNames( updatedInput );
					}

					maybeRestoreInput( updatedInput );

					break;
				case 'options':
					maybeClearInput( updatedInput );
					updateSelectOptions( updatedNode, response.value, updatedInput );

					maybeRestoreInput( updatedInput );
					break;
				default:
					maybeClearInput( updatedInput );

			}

			if ( updateCache ) {
				cache.set(
					hash,
					{
						'response': response,
						'time': Date.now(),
					}
				);
			}

			delete aborters[ updated + formId ];

			let isHidden = false;

			for ( const node of updatedInput.nodes ) {
				if ( node.classList.contains('hidden-field') ) {
					isHidden = true;
					break;
				}
			}
			
			if ( isHidden ) {
				$( updatedInput.nodes[0] ).trigger( 'change' );
			}
			
			updatedInput.reporting.validityState.current = true;

			doAction( 'jet.fbuf.input.updated', updatedInput, isCached );

		}

		function updateFormField( updatedNode, observable, button = null ) {

			let updated = updatedNode.dataset.updateFieldName,
			    updatedInput = observable.getInput( updated );

			updatedInput.jfbFieldUpdater ??= {};

			updatedInput.jfbFieldUpdater.prevValue = updatedInput.value.current;

			const formId = observable.form ? observable.form.getFormId() : observable.parent.root.form.getFormId(),
			      formFields = getFormValues( observable ),
			      updatedCalculated = observable.rootNode.querySelectorAll( `[data-formula*=${updated}]` ),
			      cacheTime = updatedNode.dataset.updateCacheTimeout || 60;

			let aUpdated = ! observable?.parent?.name ? updated : updatedInput.rawName;

			if ( aborters[ aUpdated + formId ] ) {
				aborters[ aUpdated + formId ].abort();
				delete aborters[ aUpdated + formId ];
			}

			let aborter = new AbortController();

			aborters[ aUpdated + formId ] = aborter;

			updatedNode.classList.add( 'jfb-updated-field' );

			styleCalculated( updatedCalculated, 'add' );

			maybeClearSelectOptions( updatedNode )

			maybeClearInput( updatedInput );

			if ( updatedInput?.reporting?.validityState ) {
				updatedInput.reporting.validityState.current = false;
			}

			const hash = getHash( aUpdated, formId, formFields );

			if ( cache.has( hash ) ) {
				const cached = cache.get( hash );

				if ( + Date.now() - + cached.time < cacheTime * 1000 || cacheTime < 0 ) {
					const response = cached.response;
					const isCached = true;

					updateFieldFromResponse(
						{
							response,
							updated,
							formId,
							updatedNode,
							updatedCalculated,
							updatedInput,
							hash,
							isCached
						}
					);

					return Promise.resolve();
				}
			}

			let rUpdated = ! observable?.parent?.name ? updated : updatedInput.rawName;

			let fetched = wp.apiFetch( {
				method: 'post',
				path: '/jet-form-builder-update-field-addon/v1/get-field',
				data: {
					"form_id": formId,
					"field_name": rUpdated,
					"form_fields": formFields,
				},
				signal: aborter.signal,
			} ).then( ( response ) => {

				if ( aborter !== aborters[ aUpdated + formId ] ) {
					return;
				}

				const isCached = false;

				updateFieldFromResponse(
					{
						response,
						updated,
						formId,
						updatedNode,
						updatedCalculated,
						updatedInput,
						hash,
						isCached
					},
					true
				);

				console.log( updatedNode.dataset.updateFieldName + ' updated' );

			} ).catch( function ( e ) {

				if ( aborter === aborters[ aUpdated + formId ] ) {
					console.error( e );

					delete aborters[ aUpdated + formId ];

					updatedNode.classList.remove( 'jfb-updated-field' );
				
					styleCalculated( updatedCalculated, 'remove' );

					updatedInput.reporting.validityState.current = true;
				}

			} );

			return fetched;

		}

		function setChainWatcher( input ) {
			const observable = input.root?.parent ? input.root : input.getRoot();
			
			if ( ! input.value || ! observable ) {
				return;
			}

			let inputName = input?.rawName;

			if ( ! inputName ) {
				return;
			}

			if ( inputName.match( /^[^\[\]]+\[\]$/ ) ) {
				inputName = input.name;
			} else if ( inputName.includes('[') ) {
				inputName = inputName.replaceAll( /\[\d+\]\[/g, '[' );
				
				if ( observable?.parent?.name ) {
					inputName = inputName.replaceAll( observable.parent.name + '[', '[' );
					inputName = inputName.replaceAll( '[]', '' );
				}
			}

			let dependents = getDependents( inputName, observable );

			if ( ! dependents.length ) {
				return;
			}

			observable.jfbFieldUpdater ??= {};
			observable.jfbFieldUpdater.inputs = {};

			input.jfbFieldUpdater.inputName = inputName;
			input.jfbFieldUpdater.observable = observable;

			input.value.jfbFieldUpdater = input.jfbFieldUpdater;
			input.value.jfbFieldUpdater.input = input;

			input.value.watch( updateChainLink );

			triggerUpdate( input );
		}

		async function updateChainLink( prevValue ) {
			const inputName = this.jfbFieldUpdater.inputName;
			const observable = this.jfbFieldUpdater.observable;
			
			const dependents = getDependents( inputName, observable );

			for ( const node of dependents ) {

				const updatedName = node.dataset.updateFieldName;

				const listened = getListened( node, observable );

				for ( const upd of listened ) {
					await observable.jfbFieldUpdater.inputs[ upd ];
				}
				
				if ( ! observable.jfbFieldUpdater.inputs[ updatedName ] ) {
					observable.jfbFieldUpdater.inputs[ updatedName ] = updateFormField( node, observable );
				}

				observable.jfbFieldUpdater.inputs[ updatedName ].then( () => {
					observable.jfbFieldUpdater.inputs[ updatedName ] = false;
				} );
			}
		}

		function getListened( node, observable ) {
			if ( ! node.dataset.updateListenTo ) {
				return [];
			}

			let result = node.dataset.updateListenTo
					.split(',')
					.map( ( name ) => name.replaceAll( ' ', '' ) );

			for ( const name of result ) {
				const resultNode = observable.rootNode.querySelector( `[data-update-field-name="${name}"]` );
				
				if ( observable.rootNode ) {
					let indirect = getListened( resultNode, observable );

					for ( const indirectName of indirect ) {
						if ( ! result.includes( indirectName ) ) {
							result.push( indirectName );
						}
					}
				}
			}

			return result;
		}

		function getDependents( inputName, observable ) {
			let updatableInputs = observable.rootNode.querySelectorAll( `[data-update-field-name][data-update-listen-to]` );
			let result = [];

			for ( const node of updatableInputs ) {
				const allWatched = node.dataset.updateListenTo
					.split(',')
					.map( ( name ) => name.replaceAll( ' ', '' ) );

				if ( allWatched.indexOf( inputName ) < 0 ) {
					continue;
				}

				result.push( node );
			}

			return result;
		}

		function setFieldWatcher( formId, watchedField ) {

			let observable = watchedField?.root || JetFormBuilder[ formId ];

			if ( ! observable ) {
				return;
			}

			let watched = watchedField?.rawName;

			if ( ! watched ) {
				return;
			}

			if ( watched.match( /^[^\[\]]+\[\]$/ ) ) {
				watched = watchedField.name;
			} else if ( watched.includes('[') ) {
				watched = watched.replaceAll( /\[\d+\]\[/g, '[' );
				
				if ( observable?.parent?.name ) {
					watched = watched.replaceAll( observable.parent.name + '[', '[' );
				}
			}

			if ( ! watchedField?.value ) {
				console.error( watched + ' - No value to watch' );
				return;
			}

			let hasDependants = false;

			const dependentFields = observable.rootNode.querySelectorAll( `[data-update-field-name][data-update-listen-to]` );

			for ( const updatedNode of dependentFields ) {
				const allWatched = updatedNode.dataset.updateListenTo
					.split(',')
					.map( ( name ) => name.replaceAll( ' ', '' ) );

				if ( allWatched.indexOf( watched ) < 0 ) {
					continue;
				}

				hasDependants = true;
			}
			
			watchedField.value.watch( function() {

				const dependentFields = observable.rootNode.querySelectorAll( `[data-update-field-name][data-update-listen-to]` );
				
				for ( const updatedNode of dependentFields ) {

					const allWatched = updatedNode.dataset.updateListenTo
						.split(',')
						.map( ( name ) => name.replaceAll( ' ', '' ) );

					if ( allWatched.indexOf( watched ) < 0 ) {
						continue;
					}

					updateFormField( updatedNode, observable );

				}

			} );

			if ( hasDependants ) {
				triggerUpdate( watchedField );
			}

		}

		function maybeInitListingTemplate( updatedNode, updatedInput ) {

			if ( ! updatedNode.querySelectorAll('.jet-form-builder__field-template').length ) {
				return;
			}

			if ( ! JetPlugins.hooks.actions['jet.fb.input.makeReactive'].handlers.length ) {
				return;
			}

			const handlers = JetPlugins.hooks.actions['jet.fb.input.makeReactive'].handlers;

			handlers.forEach( function( handler ) {
				
				if ( handler.namespace === 'jet-form-builder/listing-options' ) {
					
					const callback = handler.callback;

					if ( ! callback ) {
						return;
					}

					callback( updatedInput );

				}

			} );

		}

		function maybeClearInput( input ) {
			
			if ( ! input.value?.current ) {
				return;
			}
			
			if ( input.nodes?.length && input.nodes[0]?.multiple ) {
				input.value.current = [];
			} else {
				input.onClear();
			}
			
		}

		function maybeRestoreInput( input ) {
			if ( ! input?.root?.parent?.inputType === 'repeater' ) {
				return;
			}

			input.value.current = input.jfbFieldUpdater.prevValue;
		}

		function maybeClearSelectOptions( updatedNode ) {
			
			const $firstOption = $( updatedNode ).find( 'select option:first-child' );

			if ( ! $firstOption.length ) {
				return;
			}

			let param = ':gt(0)';
			
			if ( $firstOption[0]?.value ) {
				param = '';
			}
			
			$( updatedNode ).find( 'select option' + param ).remove();

		}

		function updateSelectOptions( updatedNode, options, input ) {

			maybeClearSelectOptions( updatedNode );

			const selectField = $( updatedNode ).find( 'select' );

			for ( const option of options ) {

				let opt = document.createElement( 'option' );

				opt.setAttribute( 'value', option.value );
				opt.innerHTML = option.label;

				if ( option.calculate ) {
					opt.setAttribute( 'data-calculate', option.calculate );
				}

				selectField.append( opt );

				if ( option.selected ) {
					input.value.current = option.value;
					updatedNode.querySelector( `option[value="${option.value}"]` ).setAttribute( 'selected', option.selected );
				}

			}

		}

		function ensureInnerNames( updatedInput ) {
			for ( const node of updatedInput.nodes ) {
				node.name = updatedInput.rawName;
			}
		}

	}

)( jQuery );
