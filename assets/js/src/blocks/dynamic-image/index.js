import GroupedSelectControl from "components/grouped-select-control.js";

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

const ImgIcon = <SVG width="24" height="24" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><Path d="M62.207 4.01185C62.6523 3.54777 62.875 2.9921 62.875 2.34483C62.875 1.69756 62.6523 1.14799 62.207 0.696121C61.7734 0.23204 61.2461 0 60.625 0C60.0039 0 59.4707 0.23204 59.0254 0.696121C58.5918 1.14799 58.375 1.69756 58.375 2.34483C58.375 2.9921 58.5918 3.54777 59.0254 4.01185C59.4707 4.46372 60.0039 4.68966 60.625 4.68966C61.2461 4.68966 61.7734 4.46372 62.207 4.01185Z" fill="currentColor"/><Path d="M62.875 6.44828C63.1914 6.44828 63.4551 6.5643 63.666 6.79634C63.8887 7.02838 64 7.30927 64 7.63901C64 7.95654 63.8887 8.22521 63.666 8.44504L61.9785 10.2037C61.873 10.3258 61.75 10.4174 61.6094 10.4784C61.4688 10.5273 61.3281 10.5517 61.1875 10.5517C61.0469 10.5517 60.9062 10.5273 60.7656 10.4784C60.625 10.4174 60.502 10.3258 60.3965 10.2037L57.5312 7.23599L55.668 9.15948L58.9727 11.3211C59.1016 11.4066 59.207 11.5165 59.2891 11.6509C59.3828 11.773 59.4473 11.9134 59.4824 12.0722C59.5059 12.2188 59.5 12.3714 59.4648 12.5302C59.4414 12.6889 59.3887 12.8355 59.3066 12.9698L57.0566 16.4871C56.9512 16.6458 56.8105 16.768 56.6348 16.8534C56.4707 16.9511 56.3008 17 56.125 17C56.0195 17 55.9141 16.9817 55.8086 16.945C55.7031 16.9206 55.5977 16.8718 55.4922 16.7985C55.2344 16.6275 55.0762 16.3833 55.0176 16.0657C54.959 15.7482 55.0176 15.4551 55.1934 15.1864L56.793 12.6584L54.4727 11.1562C54.1797 10.9608 53.9395 10.7166 53.752 10.4235C53.5762 10.1182 53.4707 9.78843 53.4355 9.43427C53.4004 9.0801 53.4355 8.73815 53.541 8.40841C53.6582 8.06645 53.8398 7.76724 54.0859 7.51078L55.9316 5.56897L54.4375 4.01185L52.9785 5.51401C52.7676 5.74605 52.5039 5.86207 52.1875 5.86207C51.8711 5.86207 51.6074 5.74605 51.3965 5.51401C51.1738 5.28197 51.0625 5.00718 51.0625 4.68966C51.0625 4.35991 51.1738 4.08513 51.3965 3.8653L53.6465 1.52047C53.8574 1.28843 54.1211 1.17241 54.4375 1.17241C54.7539 1.17241 55.0176 1.28843 55.2285 1.52047L61.1875 7.71228L62.084 6.79634C62.2949 6.5643 62.5586 6.44828 62.875 6.44828Z" fill="currentColor"/><Path d="M50.043 11.7241L51.1504 10.5517C51.373 10.3197 51.6367 10.2037 51.9414 10.2037C52.2578 10.2037 52.5273 10.3197 52.75 10.5517C52.9727 10.7838 53.084 11.0647 53.084 11.3944C53.084 11.7119 52.9727 11.9867 52.75 12.2188L51.291 13.7209C51.1855 13.8308 51.0625 13.9163 50.9219 13.9774C50.793 14.0384 50.6523 14.069 50.5 14.069H47.125C46.8086 14.069 46.5391 13.9591 46.3164 13.7392C46.1055 13.5072 46 13.2263 46 12.8966C46 12.5668 46.1055 12.292 46.3164 12.0722C46.5391 11.8402 46.8086 11.7241 47.125 11.7241H50.043Z" fill="currentColor"/><Path fillRule="evenodd" clipRule="evenodd" d="M29 38.5C29 40.433 27.433 42 25.5 42C23.567 42 22 40.433 22 38.5C22 36.567 23.567 35 25.5 35C27.433 35 29 36.567 29 38.5ZM27 38.5C27 39.3284 26.3284 40 25.5 40C24.6716 40 24 39.3284 24 38.5C24 37.6716 24.6716 37 25.5 37C26.3284 37 27 37.6716 27 38.5Z" fill="currentColor"/><Path d="M30.7917 44.2985C30.6037 44.1076 30.3469 44 30.0789 44C29.811 44 29.5542 44.1076 29.3662 44.2985L25.1579 48.5744L22.2917 45.6622C22.1037 45.4712 21.8469 45.3636 21.5789 45.3636C21.311 45.3636 21.0542 45.4712 20.8662 45.6622L17.2873 49.2985C16.8999 49.6922 16.9049 50.3253 17.2985 50.7127C17.6922 51.1001 18.3253 51.0951 18.7127 50.7015L21.5789 47.7892L24.4452 50.7015C24.6332 50.8924 24.8899 51 25.1579 51C25.4259 51 25.6826 50.8924 25.8706 50.7015L30.0789 46.4256L34.2873 50.7015C34.6747 51.0951 35.3078 51.1001 35.7015 50.7127C36.0951 50.3253 36.1001 49.6922 35.7127 49.2985L30.7917 44.2985Z" fill="currentColor"/><Path fillRule="evenodd" clipRule="evenodd" d="M4 22C1.79086 22 0 23.7909 0 26V60C0 62.2091 1.79086 64 4 64H48C50.2091 64 52 62.2091 52 60V26C52 23.7909 50.2091 22 48 22H4ZM48 24H4C2.89543 24 2 24.8954 2 26V60C2 61.1046 2.89543 62 4 62H48C49.1046 62 50 61.1046 50 60V26C50 24.8954 49.1046 24 48 24Z" fill="currentColor"/></SVG>;

var ImglinkFields = JSON.parse( JSON.stringify( window.JetEngineListingData.linkFields ) );

ImglinkFields[0]['values'].push( {
	label: __( 'Media File' ),
	value: '_file',
} );

registerBlockType( 'jet-engine/dynamic-image', {
	title: __( 'Dynamic Image' ),
	icon: ImgIcon,
	category: 'jet-engine',
	attributes: window.JetEngineListingData.atts.dynamicImage,
	className: 'jet-listing-dynamic-image',
	usesContext: [ 'postId', 'postType', 'queryId' ],
	edit: class extends wp.element.Component {

		render() {

			const props              = this.props;
			const attributes         = props.attributes;
			const imageSizes         = window.JetEngineListingData.imageSizes;
			const linkFields         = ImglinkFields;
			const mediaFields        = window.JetEngineListingData.mediaFields;
			const optionsFields      = window.JetEngineListingData.optionsFields;
			const mediaOptionsFields = window.JetEngineListingData.mediaOptionsFields;
			const allowedContextList = window.JetEngineListingData.allowedContextList;
			const profilePages       = window.JetEngineListingData.profileBuilderPages;

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
									value={ attributes.dynamic_image_source }
									options={mediaFields}
									onChange={ newValue => {
										props.setAttributes({ dynamic_image_source: newValue });
									}}
								/>

								{ 'options_page' === attributes.dynamic_image_source &&
									<GroupedSelectControl
										label={ __( 'Option' ) }
										value={ attributes.dynamic_field_option }
										options={mediaOptionsFields}
										onChange={ newValue => {
											props.setAttributes({
												dynamic_field_option: newValue,
											});
										}}
									/>
								}

								{ 'acf_field_groups' === attributes.dynamic_image_source && undefined !== window.JetEngineListingData.acfImagesFields &&
									<GroupedSelectControl
										label={ __( 'ACF Field' ) }
										value={ attributes.acf_field_key }
										options={ window.JetEngineListingData.acfImagesFields }
										onChange={ newValue => {
											props.setAttributes({ acf_field_key: newValue });
										}}
									/>
								}

								<TextControl
									type="text"
									label={ __("Or enter post meta field key/repeater key") }
									value={attributes.dynamic_image_source_custom}
									onChange={ newValue =>
										props.setAttributes({
											dynamic_image_source_custom: newValue
										})
									}
								/>

								<TextControl
									type="text"
									label={ __("Image URL Prefix") }
									help={ __("Add prefix to the image URL. For example for the cases when source contains only part of the URL") }
									value={attributes.image_url_prefix}
									onChange={ newValue =>
										props.setAttributes({
											image_url_prefix: newValue
										})
									}
								/>

							</PanelBody>
							<PanelBody title={ __( 'Layout' ) }>
								{ 'user_avatar' !== attributes.dynamic_image_source &&
									<SelectControl
										label={ __( 'Image Size' ) }
										value={ attributes.dynamic_image_size }
										options={imageSizes}
										onChange={ newValue => {
											props.setAttributes({
												dynamic_image_size: newValue,
											});
										}}
									/>
								}
								{ 'user_avatar' === attributes.dynamic_image_source &&
									<RangeControl
										label={ __( 'Image Size' ) }
										value={ attributes.dynamic_avatar_size }
										onChange={ newValue => {
											props.setAttributes({
												dynamic_avatar_size: newValue,
											});
										}}
										min={ 10 }
										max={ 500 }
									/>
								}
								<TextControl
									type="text"
									label={ __( 'Custom Image Alt' ) }
									value={attributes.custom_image_alt}
									onChange={ newValue =>
										props.setAttributes({
											custom_image_alt: newValue
										})
									}
								/>
								<ToggleControl
									label={ __( 'Lazy Load' ) }
									checked={ attributes.lazy_load_image }
									onChange={ () => {
										props.setAttributes({ lazy_load_image: ! attributes.lazy_load_image });
									} }
								/>
								<ToggleControl
									label={ __( 'Linked image' ) }
									checked={ attributes.linked_image }
									onChange={ () => {
										props.setAttributes({ linked_image: ! attributes.linked_image });
									} }
								/>
								{ attributes.linked_image &&
									<GroupedSelectControl
										label={ __( 'Source' ) }
										value={ attributes.image_link_source }
										options={linkFields}
										onChange={ newValue => {
											props.setAttributes({ image_link_source: newValue });
										}}
									/>
								}
								{ ( attributes.linked_image && 'options_page' === attributes.image_link_source ) &&
									<GroupedSelectControl
										label={ __( 'Option' ) }
										value={ attributes.image_link_option }
										options={optionsFields}
										onChange={ newValue => {
											props.setAttributes({ image_link_option: newValue });
										}}
									/>
								}
								{ ( attributes.linked_image && 'acf_field_groups' === attributes.image_link_source ) && undefined !== window.JetEngineListingData.acfLinksFields &&
									<GroupedSelectControl
										label={ __( 'ACF Field' ) }
										value={ attributes.acf_link_field_key }
										options={ window.JetEngineListingData.acfLinksFields }
										onChange={ newValue => {
											props.setAttributes({ acf_link_field_key: newValue });
										}}
									/>
								}
								{ ( attributes.linked_image && 'profile_page' === attributes.image_link_source ) && profilePages &&
									<GroupedSelectControl
										label={ __( 'Profile Page' ) }
										value={ attributes.dynamic_link_profile_page }
										options={profilePages}
										onChange={ newValue => {
											props.setAttributes({
												dynamic_link_profile_page: newValue,
											});
										}}
									/>
								}
								{ attributes.linked_image &&
									<div>
										<TextControl
											type="text"
											label={ __("Or enter post meta field key/repeater key") }
											value={attributes.image_link_source_custom}
											onChange={ newValue =>
												props.setAttributes({
													image_link_source_custom: newValue
												})
											}
										/>
										<TextControl
											type="text"
											label={ __("Link URL Prefix") }
											help={ __("Add prefix to the URL, for example tel:, mailto: etc.") }
											value={attributes.link_url_prefix}
											onChange={ newValue =>
												props.setAttributes({
													link_url_prefix: newValue
												})
											}
										/>
									</div>
								}
								<ToggleControl
									label={ __( 'Open in new window' ) }
									checked={ attributes.open_in_new }
									onChange={ () => {
										props.setAttributes({ open_in_new: ! attributes.open_in_new });
									} }
								/>
								<SelectControl
									label={ __( 'Add "rel" attr' ) }
									value={ attributes.rel_attr }
									options={ [
										{
											value: '',
											label: __( 'No' ),
										},
										{
											value: 'alternate',
											label: __( 'Alternate' ),
										},
										{
											value: 'author',
											label: __( 'Author' ),
										},
										{
											value: 'bookmark',
											label: __( 'Bookmark' ),
										},
										{
											value: 'external',
											label: __( 'External' ),
										},
										{
											value: 'help',
											label: __( 'Help' ),
										},
										{
											value: 'license',
											label: __( 'License' ),
										},
										{
											value: 'next',
											label: __( 'Next' ),
										},
										{
											value: 'nofollow',
											label: __( 'Nofollow' ),
										},
										{
											value: 'noreferrer',
											label: __( 'Noreferrer' ),
										},
										{
											value: 'noopener',
											label: __( 'Noopener' ),
										},
										{
											value: 'prev',
											label: __( 'Prev' ),
										},
										{
											value: 'search',
											label: __( 'Search' ),
										},
										{
											value: 'tag',
											label: __( 'Tag' ),
										},
									] }
									onChange={ newValue => {
										props.setAttributes({ rel_attr: newValue });
									}}
								/>
								<ToggleControl
									label={ __( 'Hide if value is empty' ) }
									checked={ attributes.hide_if_empty }
									onChange={ () => {
										props.setAttributes({ hide_if_empty: ! attributes.hide_if_empty });
									} }
								/>
								<div className="jet-media-control components-base-control">
									<div className="components-base-control__label">Fallback Image</div>
									{ attributes.fallback_image_url &&
										<img src={ attributes.fallback_image_url } width="100%" height="auto" />
									}
									<MediaUpload
										onSelect={ media => {
												props.setAttributes( {
													fallback_image: media.id,
													fallback_image_url: media.url,
												} );
											}
										}
										type="image"
										value={attributes.fallback_image}
										render={({ open }) => (
											<Button
												isSecondary
												icon="edit"
												onClick={ open }
											>{ __("Select Image") }</Button>
										)}
									/>
									{ attributes.fallback_image_url &&
										<Button
											onClick={ () => {
												props.setAttributes( {
													fallback_image: 0,
													fallback_image_url: '',
												} )
											} }
											isLink
											isDestructive
										>
											{ __( 'Remove Image' ) }
										</Button>
									}
								</div>
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
						block="jet-engine/dynamic-image"
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
