import registerAttributes from './attributes';
import './controls';
import registerListingUpdater from './blocks/listing-updater';
import registerUpdateFieldButton from './blocks/update-field-button';

const {
	      addFilter,
      } = wp.hooks;

addFilter(
	'blocks.registerBlockType',
	'jfb-update-field/block-attributes',
	registerAttributes,
);

function registerBlocks() {
	//registerListingUpdater();
	registerUpdateFieldButton();
}

window.isJFBUF_Button_Registered = false;

addFilter(
	'jet.fb.register.fields.handler',
	'jfb-update-field/block-attributes',
	registerVariation
)

function registerVariation( block ) {
	if ( ! window.isJFBUF_Button_Registered ) {
		window.isJFBUF_Button_Registered;
		registerUpdateFieldButton();
	}
	return block;
}

document.addEventListener( 'jet-form-builder-initialized', registerBlocks );
