import DynamicBlockControls from './toolbar';

const {
	addFilter,
	applyFilters
} = wp.hooks;

const {
	Fragment
} = wp.element;


function addToolbarControls( BlockEdit ) {
	return ( props ) => {
		if ( props.isSelected ) {
			return (
				<Fragment>
					<BlockEdit { ...props } />
					<DynamicBlockControls { ...props } />
				</Fragment>
			);
		}

		return <BlockEdit { ...props } />;
	};
}

addFilter(
	'editor.BlockEdit',
	'jet-engine/add-toolbar-controls',
	addToolbarControls,
	900
);

function registerAttributes( settings, name ) {

	var atts = window.JetEngineListingData.dynamicData[ name ];

	if ( atts ) {
		return _.assign( {}, settings, {
			attributes: _.assign( {}, settings.attributes, {
				[ window.JetEngineListingData.dynamicKey ]: {
					type: 'object',
					default: {}
				},
			} ),
			supports: _.assign( {}, settings.supports, {
				[ window.JetEngineListingData.dynamicKey ]: atts
			} ),
		} );
	} else {
		return settings;
	}
}

addFilter(
	'blocks.registerBlockType',
	'jet-engine/register-block-attributes',
	registerAttributes
);
