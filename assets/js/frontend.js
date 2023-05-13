(

	function( $ ) {

		$( window ).on( 'jet-form-builder/after-init', setWatchers );

		function clearFieldOptions( $updatedField, fieldName ) {
			$updatedField.find( '[name="' + fieldName + '"] option' ).slice(1).remove();
		}

		let alreadyWatched = {};

		function setWatchers( initEvent, $scope, observable ) {

			if ( ! observable.form ) {
				return;
			}
			
			let $updatedFields = $scope.find( '.jet-form-builder-row[data-update-field-addon-enabled]' );
		
			$updatedFields.each( function() {
				
				let $updatedField = $( this );
				
				let fieldName    = $updatedField.data( 'update-field-name' ),
					formId       = observable.form.getFormId(),
					watchedName  = $updatedField.data( 'update-listen-to' ),
					watchedField = observable.getInput( watchedName );
				
				alreadyWatched[ formId ] = alreadyWatched[ formId ] || {};
				
				if ( ! watchedField || alreadyWatched?.[ formId ]?.[ watchedName ] ) {
					return;
				}
				
				alreadyWatched[formId][watchedName] = true;
				
				watchedField.value.watch( function() {
					
					if ( ! watchedField.value.current.length ) {
						clearFieldOptions( $updatedField, fieldName );
						return;
					}
					
					let itemId = watchedField.value.current;
					
					$updatedField.css( 'opacity', 0.6 );
					$updatedField.css( 'pointer-events', 'none' );
					
					wp.apiFetch( {
						method: 'get',
						path: `/jet-form-builder-update-field-addon/v1/get-field?form_id=${formId}&field_name=${fieldName}&item_id=${itemId}`,
					} ).then( ( response ) => {
	
						$updatedField.css( 'opacity', 1 );
						$updatedField.css( 'pointer-events', 'auto' );
						
						if ( response.options ) {
							
							clearFieldOptions( $updatedField, fieldName );
	
							$.each( response.options, function( i, option ) {
								$updatedField.find( '[name="' + fieldName + '"]' ).append( $( "<option></option>" ).attr( "value", option.value ).text( option.label ) )
							} );
							
						} else if ( response.block ) {

							$updatedField.html( response.block );

							let replaced = {};

							for ( let node of observable.rootNode.querySelectorAll( '[data-jfb-sync]' ) ) {
								
								let nodeName = node.dataset.fieldName,
									replace  = ! replaced[ nodeName ];
									
								observable.observeInput( node, replace );
								
								replaced[ nodeName ] = true;

							}

							for ( const node of observable.rootNode.querySelectorAll( `[data-jfb-conditional]` ) ) {

								const block = new JetFormBuilderAbstract.ConditionalBlock( node, observable );
								
								block.observe();
								block.list.onChangeRelated();

							}

							alreadyWatched[ formId ][ fieldName ] = false;

							setWatchers( initEvent, $scope, observable );

						}

						if ( ! watchedField.value.current.length ) {
							clearFieldOptions( $updatedField, fieldName );
						}
	
					} ).catch( function ( e ) {
						console.log( e );
						$updatedField.css( 'opacity', 1 );
						$updatedField.css( 'pointer-events', 'auto' );
					} );
					
				} );
				
			} );
			
		}

	}

)( jQuery );