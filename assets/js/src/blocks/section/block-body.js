import {
	getClassWithContext
} from 'utils/utility';

const {
	InnerBlocks
} = wp.blockEditor;

const getBlockStyles = function( attributes ) {

	var styles = {};

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

	if ( attributes.custom_background_color ) {
		styles.backgroundColor = attributes.custom_background_color;
	}

	return styles;

}

const BlockBody = function( props ) {

	const {
		className,
		blockProps,
		isEdit,
		attributes
	} = props;

	const baseClass     = 'jet-section';
	const classList     = [ className, baseClass ];
	const contentStyles = {};

	if ( blockProps.className ) {
		classList.push( blockProps.className );
	}

	classList.push( 'jet-section--layout-' + attributes.layout );

	if ( attributes.background_color ) {
		classList.push( getClassWithContext( attributes.background_color, 'background-color' ) );
	}

	if ( 'boxed' === attributes.layout && attributes.content_width ) {
		contentStyles.width = attributes.content_width;
	}

	return <div
		className={ classList.join( ' ' ) }
		style={ getBlockStyles( attributes ) }
	>
		<div
			className={ baseClass + '__content' }
			style={ contentStyles }
		>
			{ isEdit && <InnerBlocks/> }
			{ ! isEdit && <InnerBlocks.Content /> }
		</div>
	</div>
}

export default BlockBody;
