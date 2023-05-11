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

const MIcon = <SVG width="24" height="24" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><Path d="M62.207 4.01185C62.6523 3.54777 62.875 2.9921 62.875 2.34483C62.875 1.69756 62.6523 1.14799 62.207 0.696121C61.7734 0.23204 61.2461 0 60.625 0C60.0039 0 59.4707 0.23204 59.0254 0.696121C58.5918 1.14799 58.375 1.69756 58.375 2.34483C58.375 2.9921 58.5918 3.54777 59.0254 4.01185C59.4707 4.46372 60.0039 4.68966 60.625 4.68966C61.2461 4.68966 61.7734 4.46372 62.207 4.01185Z" fill="currentColor"/><Path d="M62.875 6.44828C63.1914 6.44828 63.4551 6.5643 63.666 6.79634C63.8887 7.02838 64 7.30927 64 7.63901C64 7.95654 63.8887 8.22521 63.666 8.44504L61.9785 10.2037C61.873 10.3258 61.75 10.4174 61.6094 10.4784C61.4688 10.5273 61.3281 10.5517 61.1875 10.5517C61.0469 10.5517 60.9062 10.5273 60.7656 10.4784C60.625 10.4174 60.502 10.3258 60.3965 10.2037L57.5312 7.23599L55.668 9.15948L58.9727 11.3211C59.1016 11.4066 59.207 11.5165 59.2891 11.6509C59.3828 11.773 59.4473 11.9134 59.4824 12.0722C59.5059 12.2188 59.5 12.3714 59.4648 12.5302C59.4414 12.6889 59.3887 12.8355 59.3066 12.9698L57.0566 16.4871C56.9512 16.6458 56.8105 16.768 56.6348 16.8534C56.4707 16.9511 56.3008 17 56.125 17C56.0195 17 55.9141 16.9817 55.8086 16.945C55.7031 16.9206 55.5977 16.8718 55.4922 16.7985C55.2344 16.6275 55.0762 16.3833 55.0176 16.0657C54.959 15.7482 55.0176 15.4551 55.1934 15.1864L56.793 12.6584L54.4727 11.1562C54.1797 10.9608 53.9395 10.7166 53.752 10.4235C53.5762 10.1182 53.4707 9.78843 53.4355 9.43427C53.4004 9.0801 53.4355 8.73815 53.541 8.40841C53.6582 8.06645 53.8398 7.76724 54.0859 7.51078L55.9316 5.56897L54.4375 4.01185L52.9785 5.51401C52.7676 5.74605 52.5039 5.86207 52.1875 5.86207C51.8711 5.86207 51.6074 5.74605 51.3965 5.51401C51.1738 5.28197 51.0625 5.00718 51.0625 4.68966C51.0625 4.35991 51.1738 4.08513 51.3965 3.8653L53.6465 1.52047C53.8574 1.28843 54.1211 1.17241 54.4375 1.17241C54.7539 1.17241 55.0176 1.28843 55.2285 1.52047L61.1875 7.71228L62.084 6.79634C62.2949 6.5643 62.5586 6.44828 62.875 6.44828Z" fill="currentColor"/><Path d="M50.043 11.7241L51.1504 10.5517C51.373 10.3197 51.6367 10.2037 51.9414 10.2037C52.2578 10.2037 52.5273 10.3197 52.75 10.5517C52.9727 10.7838 53.084 11.0647 53.084 11.3944C53.084 11.7119 52.9727 11.9867 52.75 12.2188L51.291 13.7209C51.1855 13.8308 51.0625 13.9163 50.9219 13.9774C50.793 14.0384 50.6523 14.069 50.5 14.069H47.125C46.8086 14.069 46.5391 13.9591 46.3164 13.7392C46.1055 13.5072 46 13.2263 46 12.8966C46 12.5668 46.1055 12.292 46.3164 12.0722C46.5391 11.8402 46.8086 11.7241 47.125 11.7241H50.043Z" fill="currentColor"/><Path fillRule="evenodd" clipRule="evenodd" d="M24.8083 32.0687C24.7167 32.0229 24.625 32 24.5333 32H18.6667C18.575 32 18.4833 32.0229 18.3917 32.0687C18.3 32.0993 18.216 32.1451 18.1396 32.2062L15.2063 35.1396C15.1451 35.216 15.0917 35.3 15.0458 35.3917C15.0153 35.4833 15 35.575 15 35.6667V41.5333C15 41.625 15.0153 41.7167 15.0458 41.8083C15.0917 41.9 15.1451 41.984 15.2063 42.0604L26.9396 53.7938C27.016 53.8549 27.1 53.9007 27.1917 53.9313C27.2833 53.9771 27.375 54 27.4667 54C27.5583 54 27.65 53.9771 27.7417 53.9313C27.8333 53.9007 27.9174 53.8549 27.9937 53.7938L36.7938 44.9938C36.9313 44.841 37 44.6653 37 44.4667C37 44.2681 36.9313 44.0924 36.7938 43.9396L25.0604 32.2062C24.984 32.1451 24.9 32.0993 24.8083 32.0687ZM24.0257 34H19.1743L17 36.1743V41.0257L27.4667 51.4924L34.4924 44.4667L24.0257 34Z" fill="currentColor"/><Path fillRule="evenodd" clipRule="evenodd" d="M4 22C1.79086 22 0 23.7909 0 26V60C0 62.2091 1.79086 64 4 64H48C50.2091 64 52 62.2091 52 60V26C52 23.7909 50.2091 22 48 22H4ZM48 24H4C2.89543 24 2 24.8954 2 26V60C2 61.1046 2.89543 62 4 62H48C49.1046 62 50 61.1046 50 60V26C50 24.8954 49.1046 24 48 24Z" fill="currentColor"/></SVG>;

registerBlockType( 'jet-engine/dynamic-meta', {
	title: __( 'Dynamic Meta' ),
	icon: MIcon,
	category: 'jet-engine',
	attributes: {
		date_enabled: {
			type: 'boolean',
			default: true,
		},
		date_selected_icon: {
			type: 'number',
		},
		date_selected_icon_url: {
			type: 'string',
		},
		date_prefix: {
			type: 'string',
		},
		date_suffix: {
			type: 'string',
		},
		date_format: {
			type: 'string',
			default: 'F-j-Y',
		},
		date_link: {
			type: 'string',
			default: 'archive',
		},
		author_enabled: {
			type: 'boolean',
			default: true,
		},
		author_selected_icon: {
			type: 'number',
		},
		author_selected_icon_url: {
			type: 'string',
		},
		author_prefix: {
			type: 'string',
		},
		author_suffix: {
			type: 'string',
		},
		author_link: {
			type: 'string',
			default: 'archive',
		},
		comments_enabled: {
			type: 'boolean',
			default: true,
		},
		comments_selected_icon: {
			type: 'number',
		},
		comments_selected_icon_url: {
			type: 'string',
		},
		comments_prefix: {
			type: 'string',
		},
		comments_suffix: {
			type: 'string',
		},
		comments_link: {
			type: 'string',
			default: 'single',
		},
		zero_comments_format: {
			type: 'string',
			default: '0',
		},
		one_comment_format: {
			type: 'string',
			default: '1',
		},
		more_comments_format: {
			type: 'string',
			default: '%',
		},
		layout: {
			type: 'string',
			default: 'inline',
		},
	},
	className: 'jet-listing-dynamic-meta',
	usesContext: [ 'postId', 'postType', 'queryId' ],
	edit: class extends wp.element.Component {

		render() {

			const props      = this.props;
			const attributes = props.attributes;

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
						<PanelBody title={ __( 'Date' ) }>
							<ToggleControl
								label={ __( 'Enable date' ) }
								checked={ attributes.date_enabled }
								onChange={ () => {
									props.setAttributes({ date_enabled: ! attributes.date_enabled });
								} }
							/>

							{ attributes.date_enabled &&
								<div>
									<div className="jet-media-control components-base-control">
										{ attributes.date_selected_icon_url &&
											<img src={ attributes.date_selected_icon_url } width="100%" height="auto" />
										}
										<MediaUpload
											onSelect={ media => {
													props.setAttributes( {
														date_selected_icon: media.id,
														date_selected_icon_url: media.url,
													} );
												}
											}
											type="image"
											value={attributes.date_selected_icon}
											render={({ open }) => (
												<Button
													isSecondary
													icon="edit"
													onClick={ open }
												>{ __("Select Icon") }</Button>
											)}
										/>
										{ attributes.date_selected_icon_url &&
											<Button
												onClick={ () => {
													props.setAttributes( {
														date_selected_icon: 0,
														date_selected_icon_url: '',
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
										label={ __("Prefix") }
										value={attributes.date_prefix}
										onChange={ newValue =>
											props.setAttributes({
												date_prefix: newValue
											})
										}
									/>
									<TextControl
										type="text"
										label={ __("Suffix") }
										value={attributes.date_suffix}
										onChange={ newValue =>
											props.setAttributes({
												date_suffix: newValue
											})
										}
									/>
									<TextControl
										type="text"
										label={ __("Format") }
										value={attributes.date_format}
										onChange={ newValue =>
											props.setAttributes({
												date_format: newValue
											})
										}
									/>
									<SelectControl
										label={ __( 'Link' ) }
										value={ attributes.date_link }
										options={ [
											{
												value: 'archive',
												label: __( "Archive" ),
											},
											{
												value: 'single',
												label: __( "Post" ),
											},
											{
												value: 'no-link',
												label: __( "None" ),
											},
										] }
										onChange={ newValue => {
											props.setAttributes({ date_link: newValue });
										}}
									/>
								</div>
							}

						</PanelBody>
						<PanelBody title={ __( 'Author' ) }>
							<ToggleControl
								label={ __( 'Enable Author' ) }
								checked={ attributes.author_enabled }
								onChange={ () => {
									props.setAttributes({ author_enabled: ! attributes.author_enabled });
								} }
							/>

							{ attributes.author_enabled &&
								<div>
									<div className="jet-media-control components-base-control">
										{ attributes.author_selected_icon_url &&
											<img src={ attributes.author_selected_icon_url } width="100%" height="auto" />
										}
										<MediaUpload
											onSelect={ media => {
													props.setAttributes( {
														author_selected_icon: media.id,
														author_selected_icon_url: media.url,
													} );
												}
											}
											type="image"
											value={attributes.author_selected_icon}
											render={({ open }) => (
												<Button
													isSecondary
													icon="edit"
													onClick={ open }
												>{ __("Select Icon") }</Button>
											)}
										/>
										{ attributes.author_selected_icon_url &&
											<Button
												onClick={ () => {
													props.setAttributes( {
														author_selected_icon: 0,
														author_selected_icon_url: '',
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
										label={ __("Prefix") }
										value={attributes.author_prefix}
										onChange={ newValue =>
											props.setAttributes({
												author_prefix: newValue
											})
										}
									/>
									<TextControl
										type="text"
										label={ __("Suffix") }
										value={attributes.author_suffix}
										onChange={ newValue =>
											props.setAttributes({
												author_suffix: newValue
											})
										}
									/>
									<SelectControl
										label={ __( 'Link' ) }
										value={ attributes.author_link }
										options={ [
											{
												value: 'archive',
												label: __( "Author Archive" ),
											},
											{
												value: 'single',
												label: __( "Post" ),
											},
											{
												value: 'no-link',
												label: __( "None" ),
											},
										] }
										onChange={ newValue => {
											props.setAttributes({ author_link: newValue });
										}}
									/>
								</div>
							}

						</PanelBody>
						<PanelBody title={ __( 'Comments' ) }>
							<ToggleControl
								label={ __( 'Enable Comments' ) }
								checked={ attributes.comments_enabled }
								onChange={ () => {
									props.setAttributes({ comments_enabled: ! attributes.comments_enabled });
								} }
							/>

							{ attributes.comments_enabled &&
								<div>
									<div className="jet-media-control components-base-control">
										{ attributes.comments_selected_icon_url &&
											<img src={ attributes.comments_selected_icon_url } width="100%" height="auto" />
										}
										<MediaUpload
											onSelect={ media => {
													props.setAttributes( {
														comments_selected_icon: media.id,
														comments_selected_icon_url: media.url,
													} );
												}
											}
											type="image"
											value={attributes.comments_selected_icon}
											render={({ open }) => (
												<Button
													isSecondary
													icon="edit"
													onClick={ open }
												>{ __("Select Icon") }</Button>
											)}
										/>
										{ attributes.comments_selected_icon_url &&
											<Button
												onClick={ () => {
													props.setAttributes( {
														comments_selected_icon: 0,
														comments_selected_icon_url: '',
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
										label={ __("Prefix") }
										value={attributes.comments_prefix}
										onChange={ newValue =>
											props.setAttributes({
												comments_prefix: newValue
											})
										}
									/>
									<TextControl
										type="text"
										label={ __("Suffix") }
										value={attributes.comments_suffix}
										onChange={ newValue =>
											props.setAttributes({
												comments_suffix: newValue
											})
										}
									/>
									<SelectControl
										label={ __( 'Link' ) }
										value={ attributes.comments_link }
										options={ [
											{
												value: 'single',
												label: __( "Post" ),
											},
											{
												value: 'no-link',
												label: __( "None" ),
											},
										] }
										onChange={ newValue => {
											props.setAttributes({ author_link: newValue });
										}}
									/>
									<TextControl
										type="text"
										label={ __("Zero Comments Format") }
										value={attributes.zero_comments_format}
										onChange={ newValue =>
											props.setAttributes({
												zero_comments_format: newValue
											})
										}
									/>
									<TextControl
										type="text"
										label={ __("One Comments Format") }
										value={attributes.one_comment_format}
										onChange={ newValue =>
											props.setAttributes({
												one_comment_format: newValue
											})
										}
									/>
									<TextControl
										type="text"
										label={ __("More Comments Format") }
										value={attributes.more_comments_format}
										onChange={ newValue =>
											props.setAttributes({
												more_comments_format: newValue
											})
										}
									/>
								</div>
							}
						</PanelBody>
						<PanelBody title={ __( 'Layout' ) }>
							<SelectControl
								label={ __( 'Layout' ) }
								value={ attributes.layout }
								options={ [
									{
										value: 'inline',
										label: __( "Inline" ),
									},
									{
										value: 'list',
										label: __( "List" ),
									},
								] }
								onChange={ newValue => {
									props.setAttributes({ layout: newValue });
								}}
							/>
						</PanelBody>
					</InspectorControls>
				),
				<Disabled key={ 'block_render' }>
					<ServerSideRender
						block="jet-engine/dynamic-meta"
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
