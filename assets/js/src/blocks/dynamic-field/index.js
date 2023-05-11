import GroupedSelectControl from "components/grouped-select-control.js";
import CustomControl from "components/custom-control.js";
import { getCallbackArgs } from "utils/utility.js";

const { __ } = wp.i18n;

const {
	registerBlockType
} = wp.blocks;

const {
	InspectorControls,
	MediaUpload
} = wp.blockEditor;

const {
	PanelColor,
	Button,
	TextControl,
	TextareaControl,
	SelectControl,
	ToggleControl,
	PanelBody,
	RangeControl,
	RadioControl,
	CheckboxControl,
	Disabled,
	G,
	Path,
	Circle,
	Rect,
	SVG,
	ColorPalette
	//NumberControl
} = wp.components;

const {
	serverSideRender: ServerSideRender
} = wp;

const Icon = <SVG width="24" height="24" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><Path d="M62.207 4.01185C62.6523 3.54777 62.875 2.9921 62.875 2.34483C62.875 1.69756 62.6523 1.14799 62.207 0.696121C61.7734 0.23204 61.2461 0 60.625 0C60.0039 0 59.4707 0.23204 59.0254 0.696121C58.5918 1.14799 58.375 1.69756 58.375 2.34483C58.375 2.9921 58.5918 3.54777 59.0254 4.01185C59.4707 4.46372 60.0039 4.68966 60.625 4.68966C61.2461 4.68966 61.7734 4.46372 62.207 4.01185Z" fill="currentColor"/><Path d="M62.875 6.44828C63.1914 6.44828 63.4551 6.5643 63.666 6.79634C63.8887 7.02838 64 7.30927 64 7.63901C64 7.95654 63.8887 8.22521 63.666 8.44504L61.9785 10.2037C61.873 10.3258 61.75 10.4174 61.6094 10.4784C61.4688 10.5273 61.3281 10.5517 61.1875 10.5517C61.0469 10.5517 60.9062 10.5273 60.7656 10.4784C60.625 10.4174 60.502 10.3258 60.3965 10.2037L57.5312 7.23599L55.668 9.15948L58.9727 11.3211C59.1016 11.4066 59.207 11.5165 59.2891 11.6509C59.3828 11.773 59.4473 11.9134 59.4824 12.0722C59.5059 12.2188 59.5 12.3714 59.4648 12.5302C59.4414 12.6889 59.3887 12.8355 59.3066 12.9698L57.0566 16.4871C56.9512 16.6458 56.8105 16.768 56.6348 16.8534C56.4707 16.9511 56.3008 17 56.125 17C56.0195 17 55.9141 16.9817 55.8086 16.945C55.7031 16.9206 55.5977 16.8718 55.4922 16.7985C55.2344 16.6275 55.0762 16.3833 55.0176 16.0657C54.959 15.7482 55.0176 15.4551 55.1934 15.1864L56.793 12.6584L54.4727 11.1562C54.1797 10.9608 53.9395 10.7166 53.752 10.4235C53.5762 10.1182 53.4707 9.78843 53.4355 9.43427C53.4004 9.0801 53.4355 8.73815 53.541 8.40841C53.6582 8.06645 53.8398 7.76724 54.0859 7.51078L55.9316 5.56897L54.4375 4.01185L52.9785 5.51401C52.7676 5.74605 52.5039 5.86207 52.1875 5.86207C51.8711 5.86207 51.6074 5.74605 51.3965 5.51401C51.1738 5.28197 51.0625 5.00718 51.0625 4.68966C51.0625 4.35991 51.1738 4.08513 51.3965 3.8653L53.6465 1.52047C53.8574 1.28843 54.1211 1.17241 54.4375 1.17241C54.7539 1.17241 55.0176 1.28843 55.2285 1.52047L61.1875 7.71228L62.084 6.79634C62.2949 6.5643 62.5586 6.44828 62.875 6.44828Z" fill="currentColor"/><Path d="M50.043 11.7241L51.1504 10.5517C51.373 10.3197 51.6367 10.2037 51.9414 10.2037C52.2578 10.2037 52.5273 10.3197 52.75 10.5517C52.9727 10.7838 53.084 11.0647 53.084 11.3944C53.084 11.7119 52.9727 11.9867 52.75 12.2188L51.291 13.7209C51.1855 13.8308 51.0625 13.9163 50.9219 13.9774C50.793 14.0384 50.6523 14.069 50.5 14.069H47.125C46.8086 14.069 46.5391 13.9591 46.3164 13.7392C46.1055 13.5072 46 13.2263 46 12.8966C46 12.5668 46.1055 12.292 46.3164 12.0722C46.5391 11.8402 46.8086 11.7241 47.125 11.7241H50.043Z" fill="currentColor"/><Path fillRule="evenodd" clipRule="evenodd" d="M34 37.3296C34 38.7363 32.854 39.8448 31.48 39.8448H28.5968V50.4848C28.5968 51.8915 27.4509 53 26.0768 53H24.9117C23.5376 53 22.3917 51.8915 22.3917 50.4848V39.8448H19.52C18.1459 39.8448 17 38.7363 17 37.3296V36.5152C17 35.1084 18.146 34 19.52 34H31.48C32.854 34 34 35.1084 34 36.5152V37.3296ZM27.1168 37.8448C26.971 37.8448 26.8392 37.9042 26.7448 38C26.6532 38.0929 26.5968 38.2199 26.5968 38.3599V50.4848C26.5968 50.7694 26.364 51 26.0768 51H24.9117C24.6245 51 24.3917 50.7694 24.3917 50.4848V38.3599C24.3917 38.2199 24.3352 38.0929 24.2437 38C24.1493 37.9042 24.0175 37.8448 23.8717 37.8448H19.52C19.2328 37.8448 19 37.6141 19 37.3296V36.5152C19 36.2306 19.2328 36 19.52 36H31.48C31.7672 36 32 36.2306 32 36.5152V37.3296C32 37.6141 31.7672 37.8448 31.48 37.8448H27.1168Z" fill="currentColor"/><Path fillRule="evenodd" clipRule="evenodd" d="M4 22C1.79086 22 0 23.7909 0 26V60C0 62.2091 1.79086 64 4 64H48C50.2091 64 52 62.2091 52 60V26C52 23.7909 50.2091 22 48 22H4ZM48 24H4C2.89543 24 2 24.8954 2 26V60C2 61.1046 2.89543 62 4 62H48C49.1046 62 50 61.1046 50 60V26C50 24.8954 49.1046 24 48 24Z" fill="currentColor"/></SVG>;

registerBlockType( 'jet-engine/dynamic-field', {
	title: __( 'Dynamic Field' ),
	icon: Icon,
	category: 'jet-engine',
	attributes: window.JetEngineListingData.atts.dynamicField,
	className: 'jet-listing-dynamic-field',
	usesContext: [ 'postId', 'postType', 'queryId' ],
	edit: function( props ) {

		const attributes          = props.attributes;
		const fieldSources        = window.JetEngineListingData.fieldSources;
		const glossaries          = window.JetEngineListingData.glossariesList;
		const filterCallbacks     = window.JetEngineListingData.filterCallbacks;
		const objectFields        = window.JetEngineListingData.objectFields;
		const relTypes            = window.JetEngineListingData.relationsTypes;
		const postTypes           = window.JetEngineListingData.postTypes;
		const metaFields          = window.JetEngineListingData.metaFields;
		const optionsFields       = window.JetEngineListingData.optionsFields;
		const filterCallbacksArgs = window.JetEngineListingData.filterCallbacksArgs;
		const relationsMeta       = window.JetEngineListingData.relationsMeta;
		const allowedContextList  = window.JetEngineListingData.allowedContextList;

		let dynamicFieldCustom = attributes.dynamic_field_custom;

		function inArray( needle, highstack ) {
			return 0 <= highstack.indexOf( needle );
		};

		var object = window.JetEngineListingData.object_id;
		var listing = window.JetEngineListingData.settings;

		if ( props.context.queryId ) {
			object  = props.context.postId;
			listing = {
				listing_source: 'posts',
				listing_post_type: props.context.postType,
			};
		}

		return [
			props.isSelected && (
					<InspectorControls
						key={ 'inspector' }
					>
						<PanelBody title={ __( 'General' ) }>
							<SelectControl
								label={ __( 'Source' ) }
								value={ attributes.dynamic_field_source }
								options={ fieldSources }
								onChange={ newValue => {
									props.setAttributes({ dynamic_field_source: newValue });
								}}
							/>

							{ 'object' === attributes.dynamic_field_source &&
								<GroupedSelectControl
									label={ __( 'Post Object' ) }
									value={ attributes.dynamic_field_post_object }
									options={ objectFields }
									onChange={ newValue => {
										props.setAttributes({
											dynamic_field_post_object: newValue,
										});
									}}
								/>
							}

							{ 'relations_hierarchy' === attributes.dynamic_field_source &&
								<div>
									<SelectControl
										label={ __( 'Get' ) }
										value={ attributes.dynamic_field_relation_type }
										options={ relTypes }
										onChange={ newValue => {
											props.setAttributes({
												dynamic_field_relation_type: newValue,
											});
										}}
									/>
									<SelectControl
										label={ __( 'From Post Type' ) }
										value={ attributes.dynamic_field_relation_post_type }
										options={ postTypes }
										onChange={ newValue => {
											props.setAttributes({
												dynamic_field_relation_post_type: newValue,
											});
										}}
									/>
								</div>
							}

							{ 'meta' === attributes.dynamic_field_source &&
								<GroupedSelectControl
									label={ __( 'Meta Key' ) }
									value={ attributes.dynamic_field_post_meta }
									options={ metaFields }
									onChange={ newValue => {
										props.setAttributes({ dynamic_field_post_meta: newValue });
									}}
								/>
							}

							{ -1 !== ['object', 'meta', 'repeater_field'].indexOf( attributes.dynamic_field_source ) &&
								<TextControl
									type="text"
									label={ __("Custom Object field / Meta field / Repeater key") }
									value={ attributes.dynamic_field_post_meta_custom }
									onChange={ newValue =>
										props.setAttributes({
											dynamic_field_post_meta_custom: newValue
										})
									}
								/>
							}

							{ 'acf_field_groups' === attributes.dynamic_field_source && undefined !== window.JetEngineListingData.acfFields &&
								<GroupedSelectControl
									label={ __( 'ACF Field' ) }
									value={ attributes.acf_field_key }
									options={ window.JetEngineListingData.acfFields }
									onChange={ newValue => {
										props.setAttributes({ acf_field_key: newValue });
									}}
								/>
							}

							{ 'query_var' === attributes.dynamic_field_source &&
								<TextControl
									type="text"
									label={ __("Variable Name") }
									value={ attributes.dynamic_field_var_name }
									onChange={ newValue =>
										props.setAttributes({
											dynamic_field_var_name: newValue
										})
									}
								/>
							}

							{ 0 < relationsMeta.length && 'relation_meta_data' === attributes.dynamic_field_source && <GroupedSelectControl
								label={ __( 'Meta Field' ) }
								value={ attributes.dynamic_field_relation_meta }
								options={ relationsMeta }
								onChange={ newValue => {
									props.setAttributes({ dynamic_field_relation_meta: newValue });
								}}
							/> }

							{ 'options_page' === attributes.dynamic_field_source &&
								<GroupedSelectControl
									label={ __( 'Option' ) }
									value={ attributes.dynamic_field_option }
									options={optionsFields}
									onChange={ newValue => {
										props.setAttributes({ dynamic_field_option: newValue });
									}}
								/>
							}

							{ 'post_excerpt' === attributes.dynamic_field_post_object &&
								<div>
									<ToggleControl
										label={ __( 'Use automatically generated excerpt' ) }
										checked={ attributes.dynamic_field_wp_excerpt }
										onChange={ () => {
											props.setAttributes({ dynamic_field_wp_excerpt: ! attributes.dynamic_field_wp_excerpt });
										} }
									/>
									{ attributes.dynamic_field_wp_excerpt &&
										<div>
											<TextControl
												type="text"
												label={ __("More string") }
												value={attributes.dynamic_excerpt_more}
												onChange={ newValue =>
													props.setAttributes({
														dynamic_excerpt_more: newValue
													})
												}
											/>
											<TextControl
												type="text"
												label={ __("Custom length") }
												value={attributes.dynamic_excerpt_length}
												onChange={ newValue =>
													props.setAttributes({
														dynamic_excerpt_length: newValue
													})
												}
											/>
										</div>
									}
								</div>
							}

						</PanelBody>
						<PanelBody title={ __( 'Layout' ) }>
							<RadioControl
								label={ __( 'Expected Display (inline/multiline)' ) }
								selected={ attributes.field_display }
								options={ [
									{ label: 'Inline', value: 'inline' },
									{ label: 'Multiline', value: 'multiline' },
								] }
								onChange={ newValue => {
									props.setAttributes( { field_display: newValue } );
								} }
							/>
							<div className="jet-media-control components-base-control">
								<div className="components-base-control__label">Field Icon/Image</div>
								{ attributes.selected_field_icon_url &&
									<img src={ attributes.selected_field_icon_url } width="100%" height="auto" />
								}
								<MediaUpload
									onSelect={ media => {
											props.setAttributes( {
												selected_field_icon: media.id,
												selected_field_icon_url: media.url,
											} );
										}
									}
									type="image"
									value={attributes.selected_field_icon}
									render={({ open }) => (
										<Button
											isSecondary
											icon="edit"
											onClick={ open }
										>{ __("Select Image") }</Button>
									)}
								/>
								{ attributes.selected_field_icon_url &&
									<Button
										onClick={ () => {
											props.setAttributes( {
												selected_field_icon: 0,
												selected_field_icon_url: '',
											} )
										} }
										isLink
										isDestructive
									>
										{ __( 'Remove Icon' ) }
									</Button>
								}
							</div>
							<SelectControl
								label={ __( 'Field tag' ) }
								value={ attributes.field_tag }
								options={ [
									{
										value: 'div',
										label: 'DIV',
									},
									{
										value: 'h1',
										label: 'H1',
									},
									{
										value: 'h2',
										label: 'H2',
									},
									{
										value: 'h3',
										label: 'H3',
									},
									{
										value: 'h4',
										label: 'H4',
									},
									{
										value: 'h5',
										label: 'H5',
									},
									{
										value: 'h6',
										label: 'H6',
									},
									{
										value: 'p',
										label: 'P',
									},
									{
										value: 'span',
										label: 'SPAN',
									},
								] }
								onChange={ newValue => {
									props.setAttributes({ field_tag: newValue });
								}}
							/>
							<ToggleControl
								label={ __( 'Hide if value is empty' ) }
								checked={ attributes.hide_if_empty }
								onChange={ () => {
									props.setAttributes({ hide_if_empty: ! attributes.hide_if_empty });
								} }
							/>
							{ ! attributes.hide_if_empty &&
								<TextControl
									type="text"
									label={ __("Fallback") }
									value={attributes.field_fallback}
									onChange={ newValue =>
										props.setAttributes({
											field_fallback: newValue
										})
									}
								/>
							}
							<ToggleControl
								label={ __( 'Filter field output' ) }
								checked={ attributes.dynamic_field_filter }
								onChange={ () => {
									props.setAttributes({ dynamic_field_filter: ! attributes.dynamic_field_filter });
								} }
							/>
							{ attributes.dynamic_field_filter &&
								<SelectControl
									label={ __( 'Callback' ) }
									value={ attributes.filter_callback }
									options={ filterCallbacks }
									onChange={ newValue => {
										props.setAttributes({ filter_callback: newValue });
									}}
								/>
							}
							{ attributes.dynamic_field_filter && getCallbackArgs( attributes.filter_callback ).map( ( control ) => {
								return <CustomControl
									control={ control }
									value={ attributes[control.name] }
									onChange={ newValue => {
										props.setAttributes( { [control.name]: newValue } );
									} }
								/>
							} ) }
							<ToggleControl
								label={ __( 'Customize field output' ) }
								checked={ dynamicFieldCustom }
								onChange={ () => {
									props.setAttributes(
										{
											dynamic_field_custom: ! dynamicFieldCustom
										}
									);
								} }
							/>
							{ attributes.dynamic_field_custom &&
								<TextareaControl
									type="text"
									label={ __("Field format") }
									value={ attributes.dynamic_field_format }
									onChange={ newValue => {
										props.setAttributes({
											dynamic_field_format: newValue
										});
									} }
								/>
							}
							<SelectControl
								label={ 'Context' }
								options={ allowedContextList }
								value={ attributes.object_context }
								onChange={ newValue => {
									props.setAttributes({
										object_context: newValue
									});
								} }
							/>
						</PanelBody>
					</InspectorControls>
			),
			<Disabled key={ 'block_render' }>
				<ServerSideRender
					block="jet-engine/dynamic-field"
					attributes={ attributes }
					urlQueryArgs={ {
						object: object,
						listing: listing
					} }
				/>
			</Disabled>
		];
	},
	save: props => {
		return null;
	}
} );
