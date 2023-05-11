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

const TRIcon = <SVG width="24" height="24" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><Path d="M62.875 2.34483C62.875 2.9921 62.6523 3.54777 62.207 4.01185C61.7734 4.46372 61.2461 4.68966 60.625 4.68966C60.0039 4.68966 59.4707 4.46372 59.0254 4.01185C58.5918 3.54777 58.375 2.9921 58.375 2.34483C58.375 1.69756 58.5918 1.14799 59.0254 0.696121C59.4707 0.23204 60.0039 0 60.625 0C61.2461 0 61.7734 0.23204 62.207 0.696121C62.6523 1.14799 62.875 1.69756 62.875 2.34483Z" fill="currentColor"/><Path d="M63.666 6.79634C63.4551 6.5643 63.1914 6.44828 62.875 6.44828C62.5586 6.44828 62.2949 6.5643 62.084 6.79634L61.1875 7.71228L55.2285 1.52047C55.0176 1.28843 54.7539 1.17241 54.4375 1.17241C54.1211 1.17241 53.8574 1.28843 53.6465 1.52047L51.3965 3.8653C51.1738 4.08513 51.0625 4.35991 51.0625 4.68966C51.0625 5.00718 51.1738 5.28197 51.3965 5.51401C51.6074 5.74605 51.8711 5.86207 52.1875 5.86207C52.5039 5.86207 52.7676 5.74605 52.9785 5.51401L54.4375 4.01185L55.9316 5.56897L54.0859 7.51078C53.8398 7.76724 53.6582 8.06645 53.541 8.40841C53.4355 8.73815 53.4004 9.0801 53.4355 9.43427C53.4707 9.78843 53.5762 10.1182 53.752 10.4235C53.9395 10.7166 54.1797 10.9608 54.4727 11.1562L56.793 12.6584L55.1934 15.1864C55.0176 15.4551 54.959 15.7482 55.0176 16.0657C55.0762 16.3833 55.2344 16.6275 55.4922 16.7985C55.5977 16.8718 55.7031 16.9206 55.8086 16.945C55.9141 16.9817 56.0195 17 56.125 17C56.3008 17 56.4707 16.9511 56.6348 16.8534C56.8105 16.768 56.9512 16.6458 57.0566 16.4871L59.3066 12.9698C59.3887 12.8355 59.4414 12.6889 59.4648 12.5302C59.5 12.3714 59.5059 12.2188 59.4824 12.0722C59.4473 11.9134 59.3828 11.773 59.2891 11.6509C59.207 11.5165 59.1016 11.4066 58.9727 11.3211L55.668 9.15948L57.5312 7.23599L60.3965 10.2037C60.502 10.3258 60.625 10.4174 60.7656 10.4784C60.9062 10.5273 61.0469 10.5517 61.1875 10.5517C61.3281 10.5517 61.4688 10.5273 61.6094 10.4784C61.75 10.4174 61.873 10.3258 61.9785 10.2037L63.666 8.44504C63.8887 8.22521 64 7.95654 64 7.63901C64 7.30927 63.8887 7.02838 63.666 6.79634Z" fill="currentColor"/><Path d="M51.1504 10.5517L50.043 11.7241H47.125C46.8086 11.7241 46.5391 11.8402 46.3164 12.0722C46.1055 12.292 46 12.5668 46 12.8966C46 13.2263 46.1055 13.5072 46.3164 13.7392C46.5391 13.9591 46.8086 14.069 47.125 14.069H50.5C50.6523 14.069 50.793 14.0384 50.9219 13.9774C51.0625 13.9163 51.1855 13.8308 51.291 13.7209L52.75 12.2188C52.9727 11.9867 53.084 11.7119 53.084 11.3944C53.084 11.0647 52.9727 10.7838 52.75 10.5517C52.5273 10.3197 52.2578 10.2037 51.9414 10.2037C51.6367 10.2037 51.373 10.3197 51.1504 10.5517Z" fill="currentColor"/><Path fillRule="evenodd" clipRule="evenodd" d="M0 25C0 23.3431 1.34315 22 3 22H22C23.6569 22 25 23.3431 25 25V31C25 32.6569 23.6569 34 22 34H10L10 40C10 40.5523 10.4477 41 11 41H27V39C27 37.3431 28.3431 36 30 36H49C50.6569 36 52 37.3431 52 39V45C52 46.6569 50.6569 48 49 48L30 48C28.3431 48 27 46.6569 27 45V43H11C10.6494 43 10.3128 42.9398 10 42.8293L10 56C10 56.5523 10.4477 57 11 57H27V55C27 53.3431 28.3431 52 30 52H49C50.6569 52 52 53.3431 52 55V61C52 62.6569 50.6569 64 49 64H30C28.3431 64 27 62.6569 27 61V59H11C9.34315 59 8 57.6569 8 56L8 34H3C1.34315 34 0 32.6569 0 31V25ZM50 55C50 54.4477 49.5523 54 49 54H30C29.4477 54 29 54.4477 29 55V61C29 61.5523 29.4477 62 30 62L49 62C49.5523 62 50 61.5523 50 61V55ZM50 39C50 38.4477 49.5523 38 49 38H30C29.4477 38 29 38.4477 29 39V45C29 45.5523 29.4477 46 30 46L49 46C49.5523 46 50 45.5523 50 45V39ZM23 25C23 24.4477 22.5523 24 22 24H3C2.44772 24 2 24.4477 2 25L2 31C2 31.5523 2.44772 32 3 32H22C22.5523 32 23 31.5523 23 31V25Z" fill="currentColor"/></SVG>;

registerBlockType( 'jet-engine/dynamic-terms', {
	title: __( 'Dynamic Terms' ),
	icon: TRIcon,
	category: 'jet-engine',
	attributes:  window.JetEngineListingData.atts.dynamicTerms,
	className: 'jet-listing-dynamic-terms',
	usesContext: [ 'postId', 'postType', 'queryId' ],
	edit: class extends wp.element.Component {

		render() {

			const props              = this.props;
			const attributes         = props.attributes;
			const taxList            = window.JetEngineListingData.taxonomies;
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
								label={ __( 'From taxonomy' ) }
								value={ attributes.from_tax }
								options={ taxList }
								onChange={ newValue => {
									props.setAttributes({ from_tax: newValue });
								}}
							/>

							<ToggleControl
								label={ __( 'Show all terms' ) }
								checked={ attributes.show_all_terms }
								onChange={ () => {
									props.setAttributes({ show_all_terms: ! attributes.show_all_terms });
								} }
							/>

							{ ! attributes.show_all_terms &&
								<TextControl
									type="number"
									min="1"
									max="20"
									label={ __("Terms number to show") }
									value={attributes.terms_num}
									onChange={ newValue =>
										props.setAttributes({
											terms_num: Number(newValue)
										})
									}
								/>
							}

							<TextControl
								type="text"
								label={ __("Delimiter") }
								value={attributes.terms_delimiter}
								onChange={ newValue =>
									props.setAttributes({
										terms_delimiter: newValue
									})
								}
							/>

							<ToggleControl
								label={ __( 'Linked terms' ) }
								checked={ attributes.terms_linked }
								onChange={ () => {
									props.setAttributes({ terms_linked: ! attributes.terms_linked });
								} }
							/>

							<div className="jet-media-control components-base-control">
								{ attributes.selected_terms_icon_url &&
									<img src={ attributes.selected_terms_icon_url } width="100%" height="auto" />
								}
								<MediaUpload
									onSelect={ media => {
											props.setAttributes( {
												selected_terms_icon: media.id,
												selected_terms_icon_url: media.url,
											} );
										}
									}
									type="image"
									value={attributes.selected_terms_icon}
									render={({ open }) => (
										<Button
											isSecondary
											icon="edit"
											onClick={ open }
										>{ __("Select Icon") }</Button>
									)}
								/>
								{ attributes.selected_terms_icon_url &&
									<Button
										onClick={ () => {
											props.setAttributes( {
												selected_terms_icon: 0,
												selected_terms_icon_url: '',
											} )
										} }
										isLink
										isDestructive
									>
										{ __( 'Remove Icon' ) }
									</Button>
								}
							</div>

							<TextControl
								type="text"
								label={ __("Text before terms list") }
								value={attributes.terms_prefix}
								onChange={ newValue =>
									props.setAttributes({
										terms_prefix: newValue
									})
								}
							/>

							<TextControl
								type="text"
								label={ __("Text after terms list") }
								value={attributes.terms_suffix}
								onChange={ newValue =>
									props.setAttributes({
										terms_suffix: newValue
									})
								}
							/>

							<hr/>

							<SelectControl
								label={"Order By"}
								options={ [
									{
										value: 'name',
										label: __( 'Name' ),
									},
									{
										value: 'slug',
										label: __( 'Slug' ),
									},
									{
										value: 'term_group',
										label: __( 'Term Group' ),
									},
									{
										value: 'term_id',
										label: __( 'Term ID' ),
									},
									{
										value: 'description',
										label: __( 'Description' ),
									},
									{
										value: 'parent',
										label: __( 'Parent' ),
									},
									{
										value: 'term_order',
										label: __( 'Term Order' ),
									},
									{
										value: 'count',
										label: __( 'By the number of objects associated with the term' ),
									},
								] }
								value={ attributes.orderby }
								onChange={ newValue => {
									props.setAttributes({
										orderby: newValue
									});
								} }
							/>

							<SelectControl
								label={"Order"}
								options={ [
									{
										value: 'ASC',
										label: __( 'ASC' ),
									},
									{
										value: 'DESC',
										label: __( 'DESC' ),
									},
								] }
								value={ attributes.order }
								onChange={ newValue => {
									props.setAttributes({
										order: newValue
									});
								} }
							/>

							<hr/>

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
						block="jet-engine/dynamic-terms"
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
