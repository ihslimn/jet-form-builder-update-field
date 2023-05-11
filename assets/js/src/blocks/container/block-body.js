import {
	getClassWithContext
} from 'utils/utility';

const {
	InnerBlocks
} = wp.blockEditor;

const getBlockStyles = function( attributes ) {

	var styles = {};

	switch ( attributes.height ) {
		case 'auto':

			if ( attributes.min_height ) {
				styles.minHeight = attributes.min_height;
			}

			break;

		case 'fixed':

			if ( attributes.fixed_height ) {
				styles.height = attributes.fixed_height;
				styles.minHeight = attributes.fixed_height;
			}

			break;

		case 'fit_to_screen':

			styles.height = '100vh';
			styles.minHeight = '100vh';

			break;
	}

	switch ( attributes.width ) {

		case 'fixed':

			if ( attributes.fixed_width ) {
				styles.width = attributes.fixed_width;
			}

			break;

	}

	if ( attributes.background_image_url ) {

		styles.backgroundImage = 'url(' + attributes.background_image_url + ')';

		if ( attributes.background_settings.background_position ) {
			styles.backgroundPosition = attributes.background_settings.background_position;
		}

		if ( attributes.background_settings.background_size ) {
			styles.backgroundSize = attributes.background_settings.background_size;
		}

		if ( attributes.background_settings.background_repeat ) {
			styles.backgroundRepeat = attributes.background_settings.background_repeat;
		}

	}

	return styles;

}

const getOverlayStyles = function( attributes ) {

	var styles = {};

	if ( ! getClassWithContext( attributes.background_color, 'background-color' ) && attributes.custom_background_color ) {
		styles.backgroundColor = attributes.custom_background_color;
	}

	if ( ! getClassWithContext( attributes.background_gradient, 'background' ) && attributes.custom_background_gradient ) {
		styles.background = attributes.custom_background_gradient;
	}

	styles.opacity = attributes.background_overlay_opacity;

	return styles;

}

const BlockBody = function( props ) {

	const {
		className,
		blockProps,
		isEdit,
		attributes
	} = props;

	const baseClass = 'jet-container';

	const classList = [ className, baseClass ];

	classList.push( baseClass + '--content-direction-' + attributes.content_direction );

	switch ( attributes.content_direction ) {
		case 'vertical':
			classList.push( baseClass + '--content-justify-' + attributes.content_v_alignment );
			classList.push( baseClass + '--content-align-' + attributes.content_h_alignment );
			break;

		case 'horizontal':
			classList.push( baseClass + '--content-align-' + attributes.content_v_alignment );
			classList.push( baseClass + '--content-justify-' + attributes.content_h_alignment );
			break;
	}

	if ( blockProps.className ) {
		classList.push( blockProps.className );
	}

	const dataAttributes = {};

	if ( attributes.section_url ) {
		dataAttributes['data-url'] = attributes.section_url;
	}

	if ( attributes.section_url_target ) {
		dataAttributes['data-target'] = '_blank';
	}

	return <div
		className={ classList.join( ' ' ) }
		style={ getBlockStyles( attributes ) }
		{ ...dataAttributes }
	>
			<div
				className={ [
					baseClass + '__overlay',
					getClassWithContext( attributes.background_gradient, 'gradient-background' ),
					getClassWithContext( attributes.background_color, 'background-color' ),
					getClassWithContext( attributes.background_gradient, 'gradient-background' ) ? 'has-background-gradient' : null
				].join( ' ' ) }
				style={ getOverlayStyles( attributes ) }
			></div>
			{ isEdit && <InnerBlocks/> }
			{ ! isEdit && <InnerBlocks.Content /> }
	</div>
}

export default BlockBody;
