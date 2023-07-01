(

	function( $ ) {

		$( window ).on( 'jet-form-builder/after-init', initWatchers );

		let fieldMap = {},
			changed  = {};

		function initWatchers( initEvent, $scope, observable ) {

			const formId = observable.form.getFormId();

			changed[ formId ] = [];

			observable.rootNode.querySelectorAll( '[data-update-field-name]' ).forEach( function( node ) {

				$( `[data-update-field-name="${node.dataset.updateFieldName}"]` ).on( 'change', function() {
					console.log( node.dataset.updateFieldName + ' changed' );
					changed[ formId ][ node.dataset.updateFieldName ] = true;
				} );

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

		function setWatcher( formId, watched ) {

			const observable   = JetFormBuilder[ formId ],
			      watchedField = observable.getInput( watched );

			if ( ! watchedField?.value ) {
				console.error( watched + ' - No value to watch' );
				return;
			}

			watchedField.value.watch( function() {

				const dependentFields = observable.rootNode.querySelectorAll( `[data-update-listen-to]` ),
				      formFields      = getFormValues( observable );

				dependentFields.forEach( function( updatedNode ) {

					const allWatched = updatedNode.dataset.updateListenTo.split(',');

					if ( allWatched.indexOf( watched ) < 0 ) {
						return;
					}

					const updated      = updatedNode.dataset.updateFieldName,
					      updatedField = observable.getInput( updated );

					if ( updatedNode.dataset.updateListenAll ) {
						
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

						if ( ! response.type ) {
							throw new Error('Invalid response');
						}

						switch ( response.type ) {

							case 'value':
								updatedField.value.current = response.value;
								break;
							case 'block':
								$( updatedNode ).html( $( response.value ).html() );
								resetWatchers( observable, updatedNode );
								break;

						}
	
					} ).catch( function ( e ) {
						updatedNode.classList.remove( 'jfb-updated-field' );
						console.error(e);
					} );

				} );

			} );

		}

		function resetWatchers( observable, fieldNode ) {

			let replaced  = {},
				fieldName = fieldNode.dataset.updateFieldName;

			const {
				doAction,
			} = JetPlugins.hooks;

			for ( const node of fieldNode.querySelectorAll( 'input' ) ) {
				const replace  = ! replaced[ fieldName ];

				let input = observable.pushInput( node, replace );

				input.onObserve();
				input.addListeners();
				input.initNotifyValue();

				input.value.make();

				doAction( 'jet.fb.input.makeReactive', input );

				doAction( 'jet.fb.observe.input.manual', observable );

				if ( replace ) {
					setWatcher( observable.form.getFormId(), fieldName );
				}
				
				replaced[ fieldName ] = true;

			}

			for ( const node of observable.rootNode.querySelectorAll( '[data-jfb-conditional]' ) ) {

				const block = new JetFormBuilderAbstract.ConditionalBlock( node, observable );
				
				block.observe();
				block.list.onChangeRelated();

			}

		}

	}

)( jQuery );