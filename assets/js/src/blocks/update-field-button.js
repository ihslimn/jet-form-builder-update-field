// Import necessary components from WordPress
const { registerBlockVariation } = wp.blocks;

const variation = {
	name: 'update',
	title: 'Update Field',
	isActive: [ 'action_type' ],
	description: 'Update fields that are dependent on this button',
	icon: 'update-alt',
	scope: [ 'block', 'inserter', 'transform' ],
	attributes: {
		action_type: 'update',
	},
};

function registerUpdateFieldButton() {
    registerBlockVariation( 'jet-forms/submit-field', variation );
}

export default registerUpdateFieldButton;
