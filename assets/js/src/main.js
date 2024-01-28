import registerAttributes from './attributes';
import './controls';
import registerListingUpdater from './blocks/listing-updater';

const {
	      addFilter,
      } = wp.hooks;

addFilter(
	'blocks.registerBlockType',
	'jfb-update-field/block-attributes',
	registerAttributes,
);

function registerBlocks() {
	registerListingUpdater();
}

//document.addEventListener( 'jet-form-builder-initialized', registerBlocks );
