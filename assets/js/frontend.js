(

	function( $ ) {

		$( window ).on( 'jet-form-builder/after-init', init );

		function clearFieldOptions( fieldName ) {
			$( '[name="' + fieldName + '"] option:gt(0)' ).remove();
		}

		function init( initEvent, $scope, observable ) {

			if ( ! observable.form ) {
				return;
			}
			
			let $updatedFields = $scope.find( '.jet-form-builder-row[data-update-listen-to]' );
				alreadyWatched = {};
		
			$updatedFields.each( function() {
				
				let $updatedField = $( this );
				
				let fieldName    = $updatedField.data( 'update-field-name' ),
					formId       = observable.form.getFormId(),
					watchedName  = $updatedField.data( 'update-listen-to' ),
					watchedField = observable.getInput( watchedName );
				
				alreadyWatched[formId] = alreadyWatched[formId] || {};
				
				if ( ! watchedField || alreadyWatched?.[formId]?.[fieldName] ) {
					return;
				}
				
				alreadyWatched[formId][fieldName] = true;
				
				watchedField.value.watch( function() {
					
					if ( ! watchedField.value.current.length ) {
						clearFieldOptions( fieldName );
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
							
							clearFieldOptions( fieldName );
	
							$.each( response.options, function( i, option ) {
								$( '[name="' + fieldName + '"]' ).append( $( "<option></option>" ).attr( "value", option.value ).text( option.label ) )
							} );
							
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