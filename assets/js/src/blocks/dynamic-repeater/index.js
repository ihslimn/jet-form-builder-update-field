import GroupedSelectControl from "components/grouped-select-control.js";

const { __ } = wp.i18n;
const {
	registerBlockType
} = wp.blocks;

const {
	InspectorControls,
} = wp.blockEditor;

const {
	PanelColor,
	IconButton,
	TextControl,
	TextareaControl,
	SelectControl,
	ToggleControl,
	PanelBody,
	RangeControl,
	CheckboxControl,
	Disabled,
	G,
	Path,
	Rect,
	Circle,
	SVG
} = wp.components;

const {
	serverSideRender: ServerSideRender
} = wp;

const RIcon = <SVG width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><Path d="M62.207 4.01185C62.6523 3.54777 62.875 2.9921 62.875 2.34483C62.875 1.69756 62.6523 1.14799 62.207 0.696121C61.7734 0.23204 61.2461 0 60.625 0C60.0039 0 59.4707 0.23204 59.0254 0.696121C58.5918 1.14799 58.375 1.69756 58.375 2.34483C58.375 2.9921 58.5918 3.54777 59.0254 4.01185C59.4707 4.46372 60.0039 4.68966 60.625 4.68966C61.2461 4.68966 61.7734 4.46372 62.207 4.01185Z" fill="currentColor"/><Path d="M62.875 6.44828C63.1914 6.44828 63.4551 6.5643 63.666 6.79634C63.8887 7.02838 64 7.30927 64 7.63901C64 7.95654 63.8887 8.22521 63.666 8.44504L61.9785 10.2037C61.873 10.3258 61.75 10.4174 61.6094 10.4784C61.4688 10.5273 61.3281 10.5517 61.1875 10.5517C61.0469 10.5517 60.9062 10.5273 60.7656 10.4784C60.625 10.4174 60.502 10.3258 60.3965 10.2037L57.5312 7.23599L55.668 9.15948L58.9727 11.3211C59.1016 11.4066 59.207 11.5165 59.2891 11.6509C59.3828 11.773 59.4473 11.9134 59.4824 12.0722C59.5059 12.2188 59.5 12.3714 59.4648 12.5302C59.4414 12.6889 59.3887 12.8355 59.3066 12.9698L57.0566 16.4871C56.9512 16.6458 56.8105 16.768 56.6348 16.8534C56.4707 16.9511 56.3008 17 56.125 17C56.0195 17 55.9141 16.9817 55.8086 16.945C55.7031 16.9206 55.5977 16.8718 55.4922 16.7985C55.2344 16.6275 55.0762 16.3833 55.0176 16.0657C54.959 15.7482 55.0176 15.4551 55.1934 15.1864L56.793 12.6584L54.4727 11.1562C54.1797 10.9608 53.9395 10.7166 53.752 10.4235C53.5762 10.1182 53.4707 9.78843 53.4355 9.43427C53.4004 9.0801 53.4355 8.73815 53.541 8.40841C53.6582 8.06645 53.8398 7.76724 54.0859 7.51078L55.9316 5.56897L54.4375 4.01185L52.9785 5.51401C52.7676 5.74605 52.5039 5.86207 52.1875 5.86207C51.8711 5.86207 51.6074 5.74605 51.3965 5.51401C51.1738 5.28197 51.0625 5.00718 51.0625 4.68966C51.0625 4.35991 51.1738 4.08513 51.3965 3.8653L53.6465 1.52047C53.8574 1.28843 54.1211 1.17241 54.4375 1.17241C54.7539 1.17241 55.0176 1.28843 55.2285 1.52047L61.1875 7.71228L62.084 6.79634C62.2949 6.5643 62.5586 6.44828 62.875 6.44828Z" fill="currentColor"/><Path d="M50.043 11.7241L51.1504 10.5517C51.373 10.3197 51.6367 10.2037 51.9414 10.2037C52.2578 10.2037 52.5273 10.3197 52.75 10.5517C52.9727 10.7838 53.084 11.0647 53.084 11.3944C53.084 11.7119 52.9727 11.9867 52.75 12.2188L51.291 13.7209C51.1855 13.8308 51.0625 13.9163 50.9219 13.9774C50.793 14.0384 50.6523 14.069 50.5 14.069H47.125C46.8086 14.069 46.5391 13.9591 46.3164 13.7392C46.1055 13.5072 46 13.2263 46 12.8966C46 12.5668 46.1055 12.292 46.3164 12.0722C46.5391 11.8402 46.8086 11.7241 47.125 11.7241H50.043Z" fill="currentColor"/><Path fillRule="evenodd" clipRule="evenodd" d="M0 26C0 23.7909 1.79086 22 4 22H21C23.2091 22 25 23.7909 25 26V38C25 40.2091 23.2091 42 21 42H4C1.79086 42 0 40.2091 0 38V26ZM18.5854 24H15.4137L2 37.4137V38C2 38.702 2.3617 39.3196 2.90891 39.6764L18.5854 24ZM5.41378 40H8.5853L22.9642 25.6211C22.8106 24.8201 22.1792 24.189 21.3781 24.0357L5.41378 40ZM23 28.4137L11.4137 40H14.5853L23 31.5853V28.4137ZM23 34.4137L17.4137 40H21C22.1046 40 23 39.1046 23 38V34.4137ZM2 34.5853L12.5853 24H9.41373L2 31.4137V34.5853ZM2 28.5853L6.5853 24H4C2.89543 24 2 24.8954 2 26V28.5853Z" fill="currentColor"/><Path fillRule="evenodd" clipRule="evenodd" d="M27 26C27 23.7909 28.7909 22 31 22H48C50.2091 22 52 23.7909 52 26V38C52 40.2091 50.2091 42 48 42H31C28.7909 42 27 40.2091 27 38V26ZM31 24H48C49.1046 24 50 24.8954 50 26V38C50 39.1046 49.1046 40 48 40H31C29.8954 40 29 39.1046 29 38V26C29 24.8954 29.8954 24 31 24Z" fill="currentColor"/><Path fillRule="evenodd" clipRule="evenodd" d="M0 48C0 45.7909 1.79086 44 4 44H21C23.2091 44 25 45.7909 25 48V60C25 62.2091 23.2091 64 21 64H4C1.79086 64 0 62.2091 0 60V48ZM4 46H21C22.1046 46 23 46.8954 23 48V60C23 61.1046 22.1046 62 21 62H4C2.89543 62 2 61.1046 2 60V48C2 46.8954 2.89543 46 4 46Z" fill="currentColor"/><Path fillRule="evenodd" clipRule="evenodd" d="M27 48C27 45.7909 28.7909 44 31 44H48C50.2091 44 52 45.7909 52 48V60C52 62.2091 50.2091 64 48 64H31C28.7909 64 27 62.2091 27 60V48ZM31 46H48C49.1046 46 50 46.8954 50 48V60C50 61.1046 49.1046 62 48 62H31C29.8954 62 29 61.1046 29 60V48C29 46.8954 29.8954 46 31 46Z" fill="currentColor"/></SVG>;

registerBlockType( 'jet-engine/dynamic-repeater', {
	title: __( 'Dynamic Repeater' ),
	icon: RIcon,
	category: 'jet-engine',
	attributes: window.JetEngineListingData.atts.dynamicRepeater,
	className: 'jet-listing-dynamic-repeater',
	usesContext: [ 'postId', 'postType', 'queryId' ],
	edit: class extends wp.element.Component {

		render() {

			const props          = this.props;
			const attributes     = props.attributes;
			const repeaterFields = window.JetEngineListingData.repeaterFields;
			const optionsFields  = window.JetEngineListingData.repeaterOptionsFields;
			const allowedContextList = window.JetEngineListingData.allowedContextList;

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
							<GroupedSelectControl
								label={ __( 'Source' ) }
								value={ attributes.dynamic_field_source }
								options={repeaterFields}
								onChange={ newValue => {
									props.setAttributes({ dynamic_field_source: newValue });
								}}
							/>

							{ 'options_page' === attributes.dynamic_field_source &&
								<GroupedSelectControl
									label={ __( 'Option' ) }
									value={ attributes.dynamic_field_option }
									options={optionsFields}
									onChange={ newValue => {
										props.setAttributes({
											dynamic_field_option: newValue,
										});
									}}
								/>
							}

							{ 'acf_field_groups' === attributes.dynamic_field_source && undefined !== window.JetEngineListingData.acfRepeaterFields &&
								<GroupedSelectControl
									label={ __( 'ACF Field' ) }
									value={ attributes.acf_field_key }
									options={ window.JetEngineListingData.acfRepeaterFields }
									onChange={ newValue => {
										props.setAttributes({
											acf_field_key: newValue,
										});
									}}
								/>
							}
						</PanelBody>
						<PanelBody title={ __( 'Layout' ) }>
							<TextareaControl
								type="text"
								label={ __("Item format") }
								value={attributes.dynamic_field_format}
								onChange={ newValue => {
									props.setAttributes({
										dynamic_field_format: newValue
									});
								} }
							/>
							<SelectControl
								label={ __( 'Item HTML tag' ) }
								value={ attributes.item_tag }
								options={ [
									{
										value: 'div',
										label: 'DIV',
									},
									{
										value: 'tr',
										label: 'TR',
									},
									{
										value: 'li',
										label: 'LI',
									},
								] }
								onChange={ newValue => {
									props.setAttributes({ item_tag: newValue });
								}}
							/>
							<TextControl
								type="text"
								label={ __("Items delimiter") }
								value={attributes.items_delimiter}
								onChange={ newValue =>
									props.setAttributes({
										items_delimiter: newValue
									})
								}
							/>
							<TextareaControl
								type="text"
								label={ __("Before items markup") }
								value={attributes.dynamic_field_before}
								onChange={ newValue => {
									props.setAttributes({
										dynamic_field_before: newValue
									});
								} }
							/>
							<TextareaControl
								type="text"
								label={ __("After items markup") }
								value={attributes.dynamic_field_after}
								onChange={ newValue => {
									props.setAttributes({
										dynamic_field_after: newValue
									});
								} }
							/>
							<ToggleControl
								label={ __( 'Add counter to repeater items' ) }
								checked={ attributes.dynamic_field_counter }
								onChange={ () => {
									props.setAttributes({ dynamic_field_counter: ! attributes.dynamic_field_counter });
								} }
							/>
							{ attributes.dynamic_field_counter &&
								<div>
									<ToggleControl
										label={ __( 'Add leding zero before counter items' ) }
										checked={ attributes.dynamic_field_leading_zero }
										onChange={ () => {
											props.setAttributes({ dynamic_field_leading_zero: ! attributes.dynamic_field_leading_zero });
										} }
									/>
									<TextControl
										type="text"
										label={ __("Text after counter number") }
										value={attributes.dynamic_field_counter_after}
										onChange={ newValue =>
											props.setAttributes({
												dynamic_field_counter_after: newValue
											})
										}
									/>
									<SelectControl
										label={ __( 'Position' ) }
										value={ attributes.dynamic_field_counter_position }
										options={ [
											{
												value: 'above',
												label: __( "Above items" ),
											},
											{
												value: 'at-left',
												label: __( "At the left of the items" ),
											},
											{
												value: 'at-right',
												label: __( "At the right of the items" ),
											},
										] }
										onChange={ newValue => {
											props.setAttributes({ dynamic_field_counter_position: newValue });
										}}
									/>
								</div>
							}
							<ToggleControl
								label={ __( 'Hide if value is empty' ) }
								checked={ attributes.hide_if_empty }
								onChange={ () => {
									props.setAttributes({ hide_if_empty: ! attributes.hide_if_empty });
								} }
							/>
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
						block="jet-engine/dynamic-repeater"
						attributes={ attributes }
						urlQueryArgs={ {
							object: object,
							listing: listing
						} }
					/>
				</Disabled>
			];
		}
	},
	save: props => {
		return null;
	}
} );
