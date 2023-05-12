import { FIELD_TO_LISTEN } from './constants';
import { SUPPORTED_BLOCKS } from './constants';

const { __ } = wp.i18n;
const { addFilter } = wp.hooks;
const { Fragment } = wp.element;
const { InspectorAdvancedControls } = wp.blockEditor;
const { createHigherOrderComponent } = wp.compose;

const { InspectorControls } = wp.blockEditor;
const { TextControl, Panel, PanelRow, PanelBody } = wp.components;

const addControls = createHigherOrderComponent( ( BlockEdit ) => {



	return ( props ) => {

		let blockName = props.name;

		if ( ! SUPPORTED_BLOCKS.includes( blockName ) ) {
			return ( <BlockEdit { ...props } /> );
		}

		const {
			attributes,
			setAttributes,
			isSelected,
		} = props;

        return (
            <>
                <BlockEdit { ...props } />
                { isSelected && 
	                <InspectorControls>
	                	<Panel>
	                    	<PanelBody title="Updates Options" initialOpen={ false }>
	                    		<PanelRow>
	                    			<TextControl
							            label="Field to listen"
							            value={ attributes[ FIELD_TO_LISTEN ] }
							            onChange={ newValue => {
											setAttributes( { [ FIELD_TO_LISTEN ] : newValue } );
										} }
							        />						    	
	                    		</PanelRow>
	                    	</PanelBody>
	                    </Panel>
	                </InspectorControls>
            	}
            </>
        );
    };

}, 'addControls' );

addFilter(
	'editor.BlockEdit',
	'jet-form-builder/update-fields',
	addControls
);
