//Unused - import './plugins/sidebar';

import registerAttribute from './attributes';
import './controls';

const {
	      addFilter,
      } = wp.hooks;

addFilter(
	'blocks.registerBlockType',
	'jet-form-builder/switch-page-on-change-support',
	registerAttribute,
);