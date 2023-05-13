import { FIELD_TO_LISTEN, OPTIONS_LISTENER_ENABLED, VALUE_LISTENER_ENABLED, CALLBACK } from './constants';
import { SUPPORTED_BLOCKS } from './constants';

const { addFilter } = wp.hooks;
const { createHigherOrderComponent } = wp.compose;

const { InspectorControls } = wp.blockEditor;
const { TextControl, ToggleControl, Panel, PanelRow, PanelBody } = wp.components;

const addControls = createHigherOrderComponent( ( BlockEdit ) => {



	return ( props ) => {

		let blockName = props.name,
			supportType = SUPPORTED_BLOCKS[ blockName ] || false;

		if ( ! supportType ) {
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
							<PanelBody title="Field updater" initialOpen={ false }>
								
									{ supportType === 'options' &&
										<PanelRow>
											<ToggleControl
												label="Enable options updater"
												help={
													attributes[ OPTIONS_LISTENER_ENABLED ]
														? 'Enabled.'
														: 'Disabled.'
												}
												checked={ attributes[ OPTIONS_LISTENER_ENABLED ] }
												onChange={ () => {
													setAttributes( { [ OPTIONS_LISTENER_ENABLED ] : ! attributes[ OPTIONS_LISTENER_ENABLED ] } );
												} }
											/>
										</PanelRow> 
									}
									{ supportType === 'options' && attributes[ OPTIONS_LISTENER_ENABLED ] && 
										<PanelRow>
											<TextControl
												label="Field to listen"
												value={ attributes[ FIELD_TO_LISTEN ] }
												onChange={ newValue => {
													setAttributes( { [ FIELD_TO_LISTEN ] : newValue } );
												} }
											/>
										</PanelRow> 
									}
								{ supportType === 'value' &&
									<PanelRow>
										<ToggleControl
											label="Enable value updater"
											help={
												attributes[ VALUE_LISTENER_ENABLED ]
													? 'Enabled.'
													: 'Disabled.'
											}
											checked={ attributes[ VALUE_LISTENER_ENABLED ] }
											onChange={ () => {
												setAttributes( { [ VALUE_LISTENER_ENABLED ] : ! attributes[ VALUE_LISTENER_ENABLED ] } );
											} }
										/>
									</PanelRow>
								}
								{ supportType === 'value' && attributes[ VALUE_LISTENER_ENABLED ] && 
									<PanelRow>
											<TextControl
												label="Field to listen"
												value={ attributes[ FIELD_TO_LISTEN ] }
												onChange={ newValue => {
													setAttributes( { [ FIELD_TO_LISTEN ] : newValue } );
												} }
											/>
									</PanelRow>
								}
								{ supportType === 'value' && attributes[ VALUE_LISTENER_ENABLED ] && 
									<PanelRow>
											<TextControl
												label="Callback or query parameters"
												value={ attributes[ CALLBACK ] }
												help={ 'Callback which parameters are $item_id (value of the field that is being listened to), $field_name (this field name), $form_id (this form ID). Alternatively JetEngine query_id|property to get a specified propery from the first object from query.' }
												onChange={ newValue => {
													setAttributes( { [ CALLBACK ] : newValue } );
												} }
											/>
									</PanelRow>
								}
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
