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

document.addEventListener( 'jet-form-builder-initialized', registerBlocks );
