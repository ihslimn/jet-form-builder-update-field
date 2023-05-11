/**
 * Apply custom CSS inside editor
 */
( function( $ ) {

	"use strict";

	var JEBlocksCSS = {
		cssInput: null,

		init: function() {

			var self = this,
				css  = null;

			self.cssInput = $( '.jet_engine_listing_css' );

			if ( self.cssInput.length ) {
				$( document ).on( 'change', '.jet_engine_listing_css', self.updateStyles );

				css = self.cssInput.val();

				if ( css ) {
					css = self.parseCSS( css );
				}

				$( 'head' ).append( '<style id="jet_engine_listing_styles">' + css + '</style>' );
			}

		},
		updateStyles: function() {
			var css = $( this ).val();

			if ( css ) {
				css = JEBlocksCSS.parseCSS( css );
			}

			$( '#jet_engine_listing_styles' ).text( css );

		},
		parseCSS: function( css ) {
			return css.replace( /selector/g, '#editor' );
		}
	};

	JEBlocksCSS.init();

}( jQuery ) );
