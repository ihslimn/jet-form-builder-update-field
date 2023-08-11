(

	function( $ ) {

		$( window ).on( 'jet-form-builder/after-init', initWatchers );

		let fieldMap = {},
			changed  = {};

		function initWatchers( initEvent, $scope, observable ) {

			const formId = observable.form.getFormId();

			changed[ formId ] = [];

			observable.rootNode.querySelectorAll( '[data-update-field-name]' ).forEach( function( node ) {

				if ( ! node.dataset.updateListenTo ) {
					return;
				}

				fieldMap[ formId ] ??= {};

				node.dataset.updateListenTo.split(',').forEach( function( listened ) {
					fieldMap[ formId ][ listened ] = true;
				} );

			} );

			for ( const key in fieldMap[ formId ] ) {

				setWatcher( observable.form.getFormId(), key );
				
				const input = observable.getInput( key );

				if ( ! input || ! input.value ) {
					continue;
				}

				const value = input.value.current;

				input.value.current = 'jfb_update_related_init_watcher';
				input.value.current = value;
				
			}

		}

		function getFormValues( observable ) {

			const formFields = observable.getInputs();

			let formValues = {};

			formFields.forEach( function( input ) {

				if ( undefined === input?.value?.current ) {
					return;
				}

				formValues[ input.name ] = input.value.current;

			} );

			return formValues;

		}

		function styleCalculated( updatedCalculated, type = 'add' ) {

			updatedCalculated.forEach( function( calculated ) {
				if ( type === 'add' ) {
					calculated.classList.add( 'jfb-updated-field' );
				} else {
					calculated.classList.remove( 'jfb-updated-field' );
				}
			} );

		}

		function setWatcher( formId, watched ) {

			const observable   = JetFormBuilder[ formId ],
			      watchedField = observable.getInput( watched );

			if ( ! watchedField?.value ) {
				console.error( watched + ' - No value to watch' );
				return;
			}

			watchedField.value.watch( function() {

				if ( this.current === 'jfb_update_related_init_watcher' ) {
					return;
				}

				changed[ formId ][ watched ] = true;

				const dependentFields = observable.rootNode.querySelectorAll( `[data-update-listen-to]` ),
				      formFields      = getFormValues( observable );

				dependentFields.forEach( function( updatedNode ) {

					const allWatched = updatedNode.dataset.updateListenTo.split(',');

					if ( allWatched.indexOf( watched ) < 0 ) {
						return;
					}

					const updated      = updatedNode.dataset.updateFieldName,
					      updatedField = observable.getInput( updated ),
					      updatedCalculated = observable.rootNode.querySelectorAll( `[data-formula*=${updated}]` );

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

					updatedNode.classList.add( 'jfb-updated-field' );

					styleCalculated( updatedCalculated, 'add' )

					wp.apiFetch( {
						method: 'post',
						path: '/jet-form-builder-update-field-addon/v1/get-field',
						data: {
							"form_id"     : formId,
							"field_name"  : updated,
							"form_fields" : formFields,
						}
					} ).then( ( response ) => {
	
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

						}
	
					} ).catch( function ( e ) {
						updatedNode.classList.remove( 'jfb-updated-field' );
						styleCalculated( updatedCalculated, 'remove' )
						console.error(e);
					} );

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
			$( updatedNode ).find( 'select option:gt(0)' ).remove();
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
