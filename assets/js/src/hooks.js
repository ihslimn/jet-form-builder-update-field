const { __ } = wp.i18n;
const { addFilter } = wp.hooks;
const { Fragment } = wp.element;
const { InspectorAdvancedControls } = wp.blockEditor;
const { createHigherOrderComponent } = wp.compose;
const { TextControl } = wp.components;

const enableElementIdControlOnBlocks = window.JetEngineListingData.blocksWithIdAttr;

const addElementIdAdvancedControl = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {

		if ( ! enableElementIdControlOnBlocks.includes( props.name ) ) {
			return (
				<BlockEdit { ...props } />
			);
		}

		const {
			attributes,
			setAttributes,
			isSelected,
		} = props;

		const {
			_element_id,
		} = attributes;

		return (
			<Fragment>
				<BlockEdit {...props} />
				{ isSelected &&
					<InspectorAdvancedControls>
						<TextControl
							type="text"
							label={ __( 'CSS ID' ) }
							value={ _element_id }
							onChange={ newValue => {
								setAttributes( { _element_id: newValue } );
							} }
						/>
					</InspectorAdvancedControls>
				}
			</Fragment>
		);
	};
}, 'addElementIdAdvancedControl' );

addFilter(
	'editor.BlockEdit',
	'jet-engine/add-element-id-advanced-control',
	addElementIdAdvancedControl
);
