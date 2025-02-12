import {
	SUPPORTED_BLOCKS,
	FIELD_TO_LISTEN,
	UPDATE_ON_BUTTON,
	LISTEN_ALL,
	OPTIONS_LISTENER_ENABLED,
	VALUE_LISTENER_ENABLED,
	CALLBACK,
	BUTTON_NAME,
	CACHE_ENABLED,
	CACHE_TIMEOUT,
} from './constants';

import { isUpdaterEnabled } from './functions';

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
							{ ( supportType !== 'update_other' || attributes?.action_type === 'update' ) &&
							<PanelBody title="Field updater" initialOpen={ false }>
								
								{ supportType === 'update_other' && attributes?.action_type === 'update' &&
									<PanelRow>
										<TextControl
											label="Button name"
											help={
												'Latin lowercase letters, underscore, dash, numbers.'
											}
											value={ attributes[ BUTTON_NAME ] }
											onChange={ newValue => {
												setAttributes( { [ BUTTON_NAME ] : newValue } );
											} }
										/>
									</PanelRow> 
								}
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
								{ ( isUpdaterEnabled( props ) ) &&
									<PanelRow>
										<ToggleControl
											label="Update on action button"
											help={
												attributes[ UPDATE_ON_BUTTON ]
													? 'Yes.'
													: 'No.'
											}
											checked={ attributes[ UPDATE_ON_BUTTON ] }
											onChange={ () => {
												setAttributes( { [ UPDATE_ON_BUTTON ] : ! attributes[ UPDATE_ON_BUTTON ] } );
											} }
										/>
									</PanelRow>
								}
								{ ( isUpdaterEnabled( props ) ) && attributes[ UPDATE_ON_BUTTON ] &&
									<PanelRow>
										<TextControl
											label="Button name"
											help={ '' }
											value={ attributes[ BUTTON_NAME ] }
											onChange={ newValue => {
												setAttributes( { [ BUTTON_NAME ] : newValue } );
											} }
										/>
									</PanelRow> 
								}
								{ ( isUpdaterEnabled( props ) ) && ! attributes[ UPDATE_ON_BUTTON ] &&
									<PanelRow>
										<TextControl
											label="Fields to listen"
											help={ 'comma-separated' }
											value={ attributes[ FIELD_TO_LISTEN ] }
											onChange={ newValue => {
												setAttributes( { [ FIELD_TO_LISTEN ] : newValue } );
											} }
										/>
									</PanelRow> 
								}
								{ ( isUpdaterEnabled( props ) ) && ! attributes[ UPDATE_ON_BUTTON ] &&
									<PanelRow>
										<ToggleControl
											label="Listen all"
											help={
												attributes[ LISTEN_ALL ]
													? 'All listened fields have to have value for this field to be updated'
													: 'At least one field has to have value for this field to be updated'
											}
											checked={ attributes[ LISTEN_ALL ] }
											onChange={ () => {
												setAttributes( { [ LISTEN_ALL ] : ! attributes[ LISTEN_ALL ] } );
											} }
										/>
									</PanelRow>
								}
								{ isUpdaterEnabled( props, 'value' ) && attributes[ VALUE_LISTENER_ENABLED ] && 
									<PanelRow>
											<TextControl
												label="Callback or query parameters"
												value={ attributes[ CALLBACK ] }
												help={ 'Callback which parameters are $field_name (this field name), $form_id (this form ID), $form_fields (array of all form fields). Alternatively JetEngine query_id|property to get a specified propery from the first object from query.' }
												onChange={ newValue => {
													setAttributes( { [ CALLBACK ] : newValue } );
												} }
											/>
									</PanelRow>
								}
								{ ( isUpdaterEnabled( props ) ) &&
									<PanelRow>
										<ToggleControl
											label="Enable cache"
											help={
												attributes[ CACHE_ENABLED ]
													? 'Yes.'
													: 'No.'
											}
											checked={ attributes[ CACHE_ENABLED ] }
											onChange={ () => {
												setAttributes( { [ CACHE_ENABLED ] : ! attributes[ CACHE_ENABLED ] } );
											} }
										/>
									</PanelRow>
								}
								{ ( isUpdaterEnabled( props ) ) && attributes[ CACHE_ENABLED ] &&
									<PanelRow>
										<TextControl
											type="number"
											label="Cache timeout"
											help="Cache timeout in seconds; -1 for unlimited cache time. Cache is cleared on page reload."
											min="-1"
											max="86400"
											value={ attributes[ CACHE_TIMEOUT ] }
											onChange={ newValue => {
												setAttributes( { [ CACHE_TIMEOUT ] : newValue } );
											} }
										/>
									</PanelRow>
								}
							</PanelBody>
							}
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
