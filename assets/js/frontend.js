(

	function( $ ) {

		let fieldMap  = {},
		    changed   = {},
		    JetABAF   = {},
		    aborters  = {};

		$( window ).on( 'jet-form-builder/after-init', initWatchers );

		$( window ).on( 'jet-form-builder/init', init );

		function init() {

			const {
				addAction,
			} = window.JetPlugins.hooks;

			addAction(
				'jet.fb.input.makeReactive',
				'jfb-update-field/on-observe',
				function( input ) {
					console.log( input );
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
				updateFormField( updatedNode, formId, this );
			} );

		}

		function initWatchers( initEvent, $scope, observable ) {

			const formId = observable.form.getFormId();

			changed[ formId ] = [];

			observable.rootNode.querySelectorAll( 'select[data-default-val]' ).forEach( function( el ) {

				const input  = observable.getInput( el.name ),
					  defVal = el.dataset.defaultVal; 
				
				if ( input.value.current !== defVal ) {
					input.value.current = defVal;
				}

			} );

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

				node.dataset.updateListenTo.split(',').forEach( function( listened ) {
					fieldMap[ formId ][ listened ] = true;
				} );

			} );

			observable.rootNode.querySelectorAll( '.jfbuf-listing-updater' );

			for ( const key in fieldMap[ formId ] ) {

				setFieldWatcher( observable.form.getFormId(), key );
				
				const input = observable.getInput( key );

				if ( ! input || ! input.value || input.inputType === "repeater" ) {
					continue;
				}

				triggerUpdate( input );
				
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

			const formFields = observable.getInputs(),
			      formId = observable.form.getFormId();

			let formValues = {};

			formFields.forEach( function( input ) {

				if ( undefined === input?.value?.current || input.inputType === "repeater" ) {
					return;
				}

				formValues[ input.name ] = input.value.current;

				if ( JetABAF[ formId ]?.[ input.name ] ) {
					formValues[ input.name + '_jfbuf_timestamp_array' ] = JetBooking.stringToTimestamp( input.value.current, ' - ', JetABAF[ formId ][ input.name ] );
				}

			} );

			return formValues;

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

		function updateFormField( updatedNode, formId, button = null ) {

			const updated = updatedNode.dataset.updateFieldName,
			      observable = JetFormBuilder[ formId ],
			      formFields = getFormValues( observable ),
			      updatedField = observable.getInput( updated ),
			      updatedCalculated = observable.rootNode.querySelectorAll( `[data-formula*=${updated}]` );

			if ( aborters[ updated + formId ] ) {
				aborters[ updated + formId ].abort();
				delete aborters[ updated + formId ];
			}

			let aborter = new AbortController();

			aborters[ updated + formId ] = aborter;

			updatedNode.classList.add( 'jfb-updated-field' );

			styleCalculated( updatedCalculated, 'add' );

			maybeClearInput( updatedField );

			wp.apiFetch( {
				method: 'post',
				path: '/jet-form-builder-update-field-addon/v1/get-field',
				data: {
					"form_id"     : formId,
					"field_name"  : updated,
					"form_fields" : formFields,
				},
				signal: aborter.signal,
			} ).then( ( response ) => {

				if ( aborter !== aborters[ updated + formId ] ) {
					return;
				}

				updatedNode.classList.remove( 'jfb-updated-field' );

				styleCalculated( updatedCalculated, 'remove' )

				if ( ! response.type ) {
					throw new Error('Invalid response');
				}

				switch ( response.type ) {

					case 'value':
						updatedField.value.current = response.value;
						break;
					case 'block':

						maybeClearInput( updatedField );

						let html = $( response.value ).html() || '';
						
						$( updatedNode.querySelector( '.jet-form-builder__fields-group' ) ).html( html );
						
						maybeInitListingTemplate( updatedNode, updatedField );

						if ( response.isEmpty ) {
							updatedNode.setAttribute( 'data-update-field-is-empty', 'true' );
						 } else {
							updatedNode.setAttribute( 'data-update-field-is-empty', 'false' );
						}

						break;
					case 'options':
						maybeClearInput( updatedField );
						updateSelectOptions( updatedNode, response.value );
						break;
					default:
						maybeClearInput( updatedField );

				}

				delete aborters[ updated + formId ];

			} ).catch( function ( e ) {

				if ( aborter === aborters[ updated + formId ] ) {
					console.error( e );

					delete aborters[ updated + formId ];

					updatedNode.classList.remove( 'jfb-updated-field' );
				
					styleCalculated( updatedCalculated, 'remove' );
				}

			} );

		}

		function setFieldWatcher( formId, watched ) {

			const observable   = JetFormBuilder[ formId ],
			      watchedField = observable.getInput( watched );

			if ( ! watchedField?.value ) {
				console.error( watched + ' - No value to watch' );
				return;
			}

			watchedField.value.watch( function() {

				changed[ formId ][ watched ] = true;

				const dependentFields = observable.rootNode.querySelectorAll( `[data-update-field-name][data-update-listen-to]` );

				dependentFields.forEach( function( updatedNode ) {

					const allWatched = updatedNode.dataset.updateListenTo.split(',');

					if ( allWatched.indexOf( watched ) < 0 ) {
						return;
					}

					if ( updatedNode.dataset.updateListenAll === '1' ) {
						
						let skip = false;
						
						allWatched.forEach( function( watched ) {
							if ( ! skip && ! changed[ formId ][ watched ] ) {
								skip = true;
							}
						} );
						
						if ( skip ) {
							return;
						}

					}

					updateFormField( updatedNode, formId );

				} );

			} );

		}

		function maybeInitListingTemplate( updatedNode, updatedField ) {

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

					callback( updatedField );

				}

			} );

		}

		function maybeClearInput( input ) {
			
			if ( ! input.value?.current ) {
				return;
			}

			input.onClear();
			
		}

		function clearSelectOptions( updatedNode ) {
			
			const $firstEmpty = $( updatedNode ).find( 'select option:first-child' );

			let param = ':gt(0)';
			
			if ( $firstEmpty[0]?.value ) {
				param = '';
			}
			
			$( updatedNode ).find( 'select option' + param ).remove();

		}

		function updateSelectOptions( updatedNode, options ) {

			clearSelectOptions( updatedNode );

			$.each( options, function( i, option ) {

				let opt = document.createElement( 'option' );

				opt.setAttribute( 'value', option.value );
				opt.innerHTML = option.label;

				if ( Object.hasOwn( option, 'calculate' ) ) {
					opt.setAttribute( 'data-calculate', option.calculate );
				}

				$( updatedNode ).find( 'select' ).append( opt );

			} );

		}

	}

)( jQuery );
