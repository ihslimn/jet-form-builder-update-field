import GroupedSelectControl from "components/grouped-select-control.js";
import JetEngineRepeater from "components/repeater-control.js";
import CustomControl from "components/custom-control.js";
import { getCallbackArgs } from "utils/utility.js";

import {
	clone
} from '../../utils/utility';

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
	ExternalLink,
	Disabled,
	G,
	Path,
	Circle,
	Rect,
	SVG
} = wp.components;

const {
	serverSideRender: ServerSideRender
} = wp;

if ( -1 !== window.JetEngineListingData.activeModules.indexOf( 'maps-listings' ) ) {
	const GIcon = <SVG width="29" height="24" viewBox="0 0 58 48" fill="none" xmlns="http://www.w3.org/2000/svg"><Path fillRule="evenodd" clipRule="evenodd" d="M44.9254 9.78528C45.5538 10.9506 46.245 12.0474 46.999 13.0756C47.753 14.0924 48.4556 14.955 49.1069 15.6633C49.7695 16.3716 50.1351 16.7601 50.2036 16.8286C50.2493 16.8858 50.3007 16.9257 50.3579 16.9486C50.4264 16.9829 50.5007 17 50.5806 17C50.6606 17 50.7292 16.9829 50.7863 16.9486C50.8548 16.9257 50.912 16.8858 50.9577 16.8286C51.0262 16.7601 51.3861 16.3774 52.0373 15.6804C52.6999 14.9721 53.4083 14.1095 54.1623 13.0927C54.9163 12.0759 55.6018 10.9849 56.2188 9.81956C56.8471 8.64281 57.1613 7.56317 57.1613 6.58065C57.1613 5.55242 56.9671 4.63273 56.5786 3.82157C56.2016 3.01042 55.7046 2.32493 55.0877 1.76512C54.4708 1.19388 53.7681 0.759745 52.9798 0.462702C52.1915 0.154234 51.3918 0 50.5806 0C49.7695 0 48.9698 0.148522 48.1814 0.445565C47.4046 0.742608 46.702 1.17675 46.0736 1.74798C45.4567 2.3078 44.954 2.99899 44.5655 3.82157C44.1885 4.63273 44 5.55242 44 6.58065C44 7.55175 44.3085 8.61996 44.9254 9.78528ZM52.5558 11.9014C51.8356 12.8726 51.177 13.6721 50.5801 14.3106L50.5735 14.3035C49.9843 13.662 49.3295 12.8603 48.6086 11.8885C47.9138 10.9407 47.2739 9.92598 46.6895 8.84296C46.1758 7.87075 46 7.12866 46 6.58065C46 5.8029 46.141 5.17923 46.3767 4.66987C46.6629 4.06558 47.0136 3.59563 47.4176 3.22911L47.4189 3.22786C47.8657 2.82174 48.3538 2.52151 48.8913 2.31537C49.4614 2.10114 50.0211 2 50.5806 2C51.1316 2 51.6847 2.10357 52.251 2.32519L52.2628 2.32979L52.2746 2.33424C52.8215 2.5403 53.302 2.83741 53.7289 3.23264L53.7363 3.23948L53.7437 3.24624C54.1489 3.61389 54.492 4.07726 54.765 4.66455L54.7698 4.67499L54.7748 4.68538C55.0168 5.1907 55.1613 5.8085 55.1613 6.58065C55.1613 7.13815 54.9809 7.89164 54.4545 8.87748L54.4512 8.88378C53.8795 9.96367 53.2474 10.9689 52.5558 11.9014Z" fill="currentColor"/><Path fillRule="evenodd" clipRule="evenodd" d="M24.3939 27.5684L24.4125 27.5875L24.4316 27.6061C25.8273 28.9651 27.5522 29.6667 29.5 29.6667C31.449 29.6667 33.1709 28.9635 34.547 27.5874C35.9388 26.1956 36.6667 24.4649 36.6667 22.5C36.6667 20.5426 35.9435 18.8217 34.5471 17.4529C33.1783 16.0564 31.4574 15.3333 29.5 15.3333C27.5351 15.3333 25.8044 16.0612 24.4126 17.453C23.0365 18.8291 22.3333 20.551 22.3333 22.5C22.3333 24.4478 23.0349 26.1727 24.3939 27.5684ZM24.3333 22.5C24.3333 21.0738 24.8312 19.8628 25.8268 18.8672C26.8494 17.8446 28.0738 17.3333 29.5 17.3333C30.9262 17.3333 32.1372 17.8446 33.1328 18.8672C34.1554 19.8628 34.6667 21.0738 34.6667 22.5C34.6667 23.9262 34.1554 25.1506 33.1328 26.1732C32.1372 27.1688 30.9262 27.6667 29.5 27.6667C28.0738 27.6667 26.8494 27.1688 25.8268 26.1732C24.8312 25.1506 24.3333 23.9262 24.3333 22.5Z" fill="currentColor"/><Path fillRule="evenodd" clipRule="evenodd" d="M11 7C9.6441 7 8.30729 7.24826 6.98958 7.74479C5.69097 8.24132 4.51649 8.96701 3.46615 9.92188C2.4349 10.8576 1.59462 12.013 0.945312 13.388C0.315104 14.7439 0 16.2812 0 18C0 19.6233 0.515625 21.4089 1.54688 23.3568C2.59722 25.3047 3.7526 27.138 5.01302 28.8568C6.27344 30.5564 7.44792 31.9983 8.53646 33.1823C9.6441 34.3663 10.2552 35.0156 10.3698 35.1302C10.4462 35.2257 10.5321 35.2925 10.6276 35.3307C10.7422 35.388 10.8663 35.4167 11 35.4167C11.1337 35.4167 11.2483 35.388 11.3438 35.3307C11.4583 35.2925 11.5538 35.2257 11.6302 35.1302C11.7448 35.0156 12.3464 34.3759 13.4349 33.2109C14.2939 32.2927 15.1988 31.2195 16.1496 29.9912C16.1596 30.0102 16.1696 30.0292 16.1797 30.0482C17.6597 32.793 19.2878 35.3763 21.0638 37.7982C22.8398 40.1931 24.4948 42.2248 26.0286 43.8932C27.5894 45.5616 28.4505 46.4766 28.612 46.638C28.7196 46.7726 28.8407 46.8668 28.9753 46.9206C29.1367 47.0013 29.3116 47.0417 29.5 47.0417C29.6884 47.0417 29.8498 47.0013 29.9844 46.9206C30.1458 46.8668 30.2804 46.7726 30.388 46.638C30.5495 46.4766 31.3971 45.5751 32.931 43.9336C34.4918 42.2652 36.1602 40.2335 37.9362 37.8385C39.7122 35.4436 41.3268 32.8737 42.7799 30.1289C44.26 27.3572 45 24.8142 45 22.5C45 20.0781 44.5425 17.9119 43.6276 16.0013C42.7396 14.0907 41.569 12.4761 40.1159 11.1576C38.6628 9.81207 37.0078 8.7895 35.151 8.08984C33.2943 7.36328 31.4106 7 29.5 7C27.5894 7 25.7057 7.34983 23.849 8.04948C22.1939 8.6823 20.6819 9.5793 19.313 10.7405C19.0674 10.4623 18.8077 10.199 18.5339 9.95052C17.5026 8.99566 16.3281 8.26997 15.0104 7.77344C13.6927 7.25781 12.3559 7 11 7ZM15.1913 27.948C14.3971 26.007 14 24.191 14 22.5C14 20.0781 14.444 17.9119 15.332 16.0013C16.0248 14.5342 16.8719 13.2446 17.8733 12.1324C17.6578 11.8829 17.43 11.6495 17.1899 11.4316L17.1824 11.4249L17.175 11.418C16.3339 10.6392 15.3815 10.0505 14.3052 9.64498L14.2934 9.64053L14.2816 9.63592C13.1859 9.20715 12.0957 9 11 9C9.89575 9 8.79893 9.20087 7.69935 9.61462C6.64016 10.0202 5.68022 10.612 4.81149 11.4018L4.81013 11.403C3.99194 12.1454 3.30357 13.0795 2.75647 14.2364C2.26767 15.2903 2 16.5315 2 18C2 19.1999 2.38277 20.6593 3.31094 22.4144C4.3173 24.28 5.42144 26.0312 6.62258 27.6696C7.84989 29.3244 8.97655 30.7053 10.0031 31.8225C10.3998 32.2465 10.7319 32.601 10.9996 32.8862C11.2623 32.6062 11.5868 32.2593 11.9736 31.8454L11.9744 31.8446C12.9634 30.7873 14.0357 29.4916 15.1913 27.948ZM27.4951 42.5332C28.4164 43.5181 29.0807 44.2261 29.4998 44.6706C29.9134 44.2315 30.5661 43.5351 31.4697 42.5681L31.4704 42.5673C32.9664 40.9681 34.5862 38.9984 36.3297 36.6472C38.0433 34.3365 39.6045 31.8525 41.0124 29.1931L41.0157 29.1868C42.3938 26.606 43 24.3892 43 22.5C43 20.3342 42.5922 18.4699 41.8238 16.8651L41.8188 16.8547L41.8139 16.8443C41.03 15.1576 40.0133 13.7651 38.7719 12.6387L38.7645 12.6319L38.7571 12.6251C37.494 11.4556 36.0611 10.5701 34.4458 9.96138L34.434 9.95693L34.4222 9.95233C32.7874 9.31262 31.1504 9 29.5 9C27.8411 9 26.1974 9.30242 24.5588 9.91929C22.9683 10.528 21.5279 11.4167 20.2295 12.5971L20.2281 12.5983C18.9881 13.7235 17.9559 15.1303 17.1432 16.8497C16.3966 18.4583 16 20.3283 16 22.5C16 24.3638 16.5936 26.5537 17.9437 29.1057C19.3798 31.7683 20.9566 34.2696 22.6735 36.6112C24.4163 38.9611 26.0234 40.9318 27.4951 42.5332Z" fill="currentColor"/></SVG>;
	
	const blockAttributes = window.JetEngineListingData.atts.mapsListing;

	registerBlockType( 'jet-engine/maps-listing', {
		title: __( 'Map Listing' ),
		icon: GIcon,
		category: 'jet-engine',
		attributes: blockAttributes,
		className: 'jet-map-listing',
		edit: class extends wp.element.Component {

			constructor( props ) {

				if ( ! props.attributes._block_id ) {
					props.setAttributes( { _block_id: props.clientId } );
				}

				super( props );
			}

			getCustomControlsSection( section ) {
				
				const providerControls = window.JetEngineListingData.mapsListingConfig.providerControls;
				const props            = this.props;
				const attributes       = props.attributes;

				if ( ! providerControls || ! providerControls[ section ] ) {
					return;
				}

				return providerControls[ section ].map( ( data ) => {

					const control = data.control;

					control.name = data.key;

					return <CustomControl
						control={ control }
						value={ attributes[ control.name ] }
						onChange={ newValue => {
							props.setAttributes( { [ control.name ]: newValue } );
						} }
					/>
				} );

			}

			render() {

				const props               = this.props;
				const attributes          = props.attributes;
				const listingOptions      = window.JetEngineListingData.listingOptions;
				const hideOptions         = window.JetEngineListingData.hideOptions;
				const metaFields          = window.JetEngineListingData.metaFields;
				const filterCallbacks     = window.JetEngineListingData.filterCallbacks;
				const markerTypes         = window.JetEngineListingData.mapsListingConfig.markerTypes;
				const markerLabelTypes    = window.JetEngineListingData.mapsListingConfig.markerLabelTypes;
				const filterCallbacksArgs = window.JetEngineListingData.filterCallbacksArgs;

				const metaTypes = [
					{
						value: 'CHAR',
						label: 'CHAR'
					},
					{
						value: 'NUMERIC',
						label: 'NUMERIC'
					},
					{
						value: 'BINARY',
						label: 'BINARY'
					},
					{
						value: 'DATE',
						label: 'DATE'
					},
					{
						value: 'DATETIME',
						label: 'DATETIME'
					},
					{
						value: 'DECIMAL',
						label: 'DECIMAL'
					},
					{
						value: 'SIGNED',
						label: 'SIGNED'
					},
					{
						value: 'UNSIGNED',
						label: 'UNSIGNED'
					}
				];

				const updateItem = function( item, key, value, prop ) {

					prop = prop || 'posts_query';

					const query = clone( props.attributes[ prop ] );
					const index = getItemIndex( item );
					const currentItem = query[ getItemIndex( item, prop ) ];

					if ( ! currentItem ) {
						return;
					}

					if ( 'object' === typeof key ) {
						for ( var _key in key ) {
							currentItem[_key] = key[_key];
						}
					} else {
						currentItem[ key ] = value;
					}

					query[ index ] = currentItem;

					props.setAttributes( { [ prop ]: query } );

				};

				const getItemIndex = function( item, prop ) {

					prop = prop || 'posts_query';

					return props.attributes[ prop ].findIndex( queryItem => {
						return queryItem == item;
					} );
				};

				return [
					props.isSelected && (
						<InspectorControls
							key={ 'inspector' }
						>
							<PanelBody title={ __( 'General' ) }>
								<SelectControl
									label={ __( 'Listing' ) }
									value={ attributes.lisitng_id }
									options={ listingOptions }
									onChange={ newValue => {
										props.setAttributes( { lisitng_id: newValue } );
									} }
								/>
								<TextControl
									type="text"
									label={ __( 'Address Meta Field' ) }
									help={ __( 'Set meta field key to get address from (for human-readable addresses). To get address from multiple meta fields, combine these fields names with "+" sign. For example: state+city+street' ) }
									value={ attributes.address_field }
									onChange={ newValue => {
										props.setAttributes( { address_field: newValue } );
									} }
								/>
								<ToggleControl
									label={ __( 'Use Lat Lng Address Meta Field' ) }
									help={ __( 'Check this if you want to get item address for the map by latitude and longitude stored directly in the meta field' ) }
									checked={ attributes.add_lat_lng }
									onChange={ () => {
										props.setAttributes( { add_lat_lng: ! attributes.add_lat_lng } );
									} }
								/>
								{ attributes.add_lat_lng && <TextControl
									type="text"
									label={ __( 'Lat Lng Address Meta Field' ) }
									help={ __( 'Set meta field key to get latitude and longitude from. To get address from latitude and longitude meta fields, combine these fields names with "+" sign. For example: _lat+_lng. Latitude field always should be first' ) }
									value={ attributes.lat_lng_address_field }
									onChange={ newValue => {
										props.setAttributes( { lat_lng_address_field: newValue } );
									} }
								/> }
								<TextControl
									type="number"
									label={ __( 'Map Height' ) }
									value={ attributes.map_height }
									min={ `100` }
									max={ `1000` }
									onChange={ newValue => {
										props.setAttributes( { map_height: Number(newValue) } );
									} }
								/>
								<TextControl
									type="number"
									label={ __( 'Posts number' ) }
									value={ attributes.posts_num }
									min={ `1` }
									max={ `1000` }
									onChange={ newValue => {
										props.setAttributes( { posts_num: Number(newValue) } );
									} }
								/>
								<ToggleControl
									label={ __( 'Automatically detect map center' ) }
									checked={ attributes.auto_center }
									onChange={ () => {
										props.setAttributes( { auto_center: ! attributes.auto_center } );
									} }
								/>
								{ attributes.auto_center && <TextControl
									type="number"
									label={ __( 'Max Zoom' ) }
									value={ attributes.max_zoom }
									min={ `1` }
									max={ `20` }
									onChange={ newValue => {
										props.setAttributes( { max_zoom: Number(newValue) } );
									} }
								/> }
								{ ! attributes.auto_center && <TextareaControl
									type="text"
									label={ __( 'Map Center' ) }
									value={ attributes.custom_center }
									onChange={ newValue => {
										props.setAttributes( { custom_center: newValue } );
									} }
								/> }
								{ ! attributes.auto_center && <TextControl
									type="number"
									label={ __( 'Custom Zoom' ) }
									value={ attributes.custom_zoom }
									min={ `1` }
									max={ `20` }
									onChange={ newValue => {
										props.setAttributes( { custom_zoom: Number(newValue) } );
									} }
								/> }
								{ this.getCustomControlsSection( 'section_general' ) }
							</PanelBody>
							{ window.JetEngineListingData.legacy.is_disabled && <PanelBody
								title={ __( 'Custom Query' ) }
								initialOpen={ false }
							>
								<ToggleControl
									label={ __( 'Use Custom Query' ) }
									checked={ attributes.custom_query }
									onChange={ () => {
										props.setAttributes({ custom_query: ! attributes.custom_query });
									} }
								/>
								{ attributes.custom_query && <SelectControl
									multiple={false}
									label={ __( 'Custom Query' ) }
									value={ attributes.custom_query_id }
									options={ window.JetEngineListingData.queriesList }
									onChange={ newValue => {
										props.setAttributes( { custom_query_id: newValue } );
									}}
								/> }
							</PanelBody> }
							<PanelBody
								title={ __( 'Marker' ) }
								initialOpen={ false }
							>
								<SelectControl
									label={ __( 'Marker Type' ) }
									value={ attributes.marker_type }
									options={ markerTypes }
									onChange={ newValue => {
										props.setAttributes( { marker_type: newValue } );
									} }
								/>
								{ 'icon' === attributes.marker_type &&
								<div className="jet-media-control components-base-control">
									<div className="components-base-control__label">{ __( 'Image/Icon' ) }</div>
									{ attributes.marker_icon_url && <img src={ attributes.marker_icon_url } width="100%" height="auto"/> }
									<MediaUpload
										onSelect={ media => {
											props.setAttributes( {
												marker_icon:     media.id,
												marker_icon_url: media.url,
											} );
										} }
										type="image"
										value={ attributes.marker_icon }
										render={ ( { open } ) => (
											<Button
												isSecondary
												icon="edit"
												onClick={ open }
											>{ __( 'Select Image/Icon' ) }</Button>
										) }
									/>
									{ attributes.marker_icon_url &&
									<Button
										onClick={ () => {
											props.setAttributes( {
												marker_icon: 0,
												marker_icon_url: '',
											} )
										} }
										isLink
										isDestructive
									>
										{ __( 'Remove Image/Icon' ) }
									</Button>
									}
								</div>
								}
								{ 'dynamic_image' === attributes.marker_type && <GroupedSelectControl
									label={ __( 'Meta Field' ) }
									value={ attributes.marker_image_field }
									options={ metaFields }
									onChange={ newValue => {
										props.setAttributes( { marker_image_field: newValue } );
									} }
								/> }
								{ 'dynamic_image' === attributes.marker_type && <TextControl
									type="text"
									label={ __( 'Or enter meta field key' ) }
									help={ __( 'Note: this field will override Meta Field value' ) }
									value={ attributes.marker_image_field_custom }
									onChange={ newValue => {
										props.setAttributes( { marker_image_field_custom: newValue } );
									} }
								/> }
								{ 'text' === attributes.marker_type && <SelectControl
									label={ __( 'Marker Label' ) }
									value={ attributes.marker_label_type }
									options={ markerLabelTypes }
									onChange={ newValue => {
										props.setAttributes( { marker_label_type: newValue } );
									} }
								/> }
								{ 'text' === attributes.marker_type && 'meta_field' === attributes.marker_label_type && <GroupedSelectControl
									label={ __( 'Meta Field' ) }
									value={ attributes.marker_label_field }
									options={ metaFields }
									onChange={ newValue => {
										props.setAttributes( { marker_label_field: newValue } );
									} }
								/> }
								{ 'text' === attributes.marker_type && 'meta_field' === attributes.marker_label_type && <TextControl
									type="text"
									label={ __( 'Or enter meta field key' ) }
									help={ __( 'Note: this field will override Meta Field value' ) }
									value={ attributes.marker_label_field_custom }
									onChange={ newValue => {
										props.setAttributes( { marker_label_field_custom: newValue } );
									} }
								/> }
								{ 'text' === attributes.marker_type && 'static_text' === attributes.marker_label_type && <TextControl
									type="text"
									label={ __( 'Marker Label' ) }
									value={ attributes.marker_label_text }
									onChange={ newValue => {
										props.setAttributes( { marker_label_text: newValue } );
									} }
								/> }
								{ -1 !== window.JetEngineListingData.activeModules.indexOf( 'custom-content-types' ) &&
									( ( 'text' === attributes.marker_type && 'cct_field' === attributes.marker_label_type ) || 'dynamic_image_cct' === attributes.marker_type )  &&
									<TextControl
										type="text"
										label={ __( 'Field' ) }
										value={ attributes.marker_cct_field }
										onChange={ newValue => {
											props.setAttributes( { marker_cct_field: newValue } );
										} }
									/>
								}
								{ 'text' === attributes.marker_type && <SelectControl
									label={ __( 'Callback' ) }
									value={ attributes.marker_label_format_cb }
									options={ filterCallbacks }
									onChange={ newValue => {
										props.setAttributes( { marker_label_format_cb: newValue } );
									} }
								/> }

								{ 'text' === attributes.marker_type && getCallbackArgs( attributes.marker_label_format_cb ).map( ( control ) => {
									return <CustomControl
										control={ control }
										value={ attributes[control.name] }
										onChange={ newValue => {
											props.setAttributes( { [control.name]: newValue } );
										} }
									/>
								} ) }

								{ 'text' === attributes.marker_type && <ToggleControl
									label={ __( 'Customize output' ) }
									checked={ attributes.marker_label_custom }
									onChange={ () => {
										props.setAttributes( { marker_label_custom: ! attributes.marker_label_custom } );
									} }
								/> }
								{ 'text' === attributes.marker_type && attributes.marker_label_custom && <TextareaControl
									type="text"
									label={ __( 'Label format' ) }
									help={ __( '%s will be replaced with field value' ) }
									value={ attributes.marker_label_custom_output }
									onChange={ newValue => {
										props.setAttributes( { marker_label_custom_output: newValue } );
									} }
								/> }
								<ToggleControl
									label={ __( 'Use different markers by conditions' ) }
									help={ __( 'Previously set marker will be used as default if conditions not met' ) }
									checked={ attributes.multiple_marker_types }
									onChange={ () => {
										props.setAttributes( { multiple_marker_types: ! attributes.multiple_marker_types } );
									} }
								/>
								{ attributes.multiple_marker_types &&
								<JetEngineRepeater
									data={ attributes.multiple_markers }
									default={ {
										apply_type: 'meta_field',
									} }
									onChange={ newData => {
										props.setAttributes( { multiple_markers: newData } );
									} }
								>
									{
										( item ) =>
											<div>
												<div className="jet-media-control components-base-control">
													<div className="components-base-control__label">{ __( 'Image/Icon' ) }</div>
													{ item.marker_icon_url && <img src={ item.marker_icon_url } width="100%" height="auto"/> }
													<MediaUpload
														onSelect={ media => {
															updateItem( item, {
																marker_icon: media.id,
																marker_icon_url: media.url,
															}, null, 'multiple_markers' );
														} }
														type="image"
														value={ item.marker_icon }
														render={ ( { open } ) => (
															<Button
																isSecondary
																icon="edit"
																onClick={ open }
															>{ __( 'Select Image/Icon' ) }</Button>
														) }
													/>
													{ item.marker_icon_url &&
													<Button
														onClick={ () => {
															updateItem( item, {
																marker_icon: 0,
																marker_icon_url:'',
															}, null, 'multiple_markers' );
														} }
														isLink
														isDestructive
													>
														{ __( 'Remove Image/Icon' ) }
													</Button>
													}
												</div>
												<SelectControl
													label={ __( 'Apply this marker if' ) }
													value={ item.apply_type }
													options={ [
														{
															value: 'meta_field',
															label: __( 'Meta field is equal to value' ),
														},
														{
															value: 'post_term',
															label: __( 'Post has term' ),
														},
													] }
													onChange={ newValue => {
														updateItem( item, 'apply_type', newValue, 'multiple_markers' )
													} }
												/>
												{ 'meta_field' === item.apply_type && <GroupedSelectControl
													label={ __( 'Meta Field' ) }
													value={ item.field_name }
													options={ metaFields }
													onChange={ newValue => {
														updateItem( item, 'field_name', newValue, 'multiple_markers' )
													} }
												/> }
												{ 'meta_field' === item.apply_type && <TextControl
													type="text"
													label={ __( 'Or enter meta field key' ) }
													help={ __( 'Note: this field will override Meta Field value' ) }
													value={ item.field_name_custom }
													onChange={ newValue => {
														updateItem( item, 'field_name_custom', newValue, 'multiple_markers' )
													} }
												/> }
												{ 'meta_field' === item.apply_type && <TextControl
													type="text"
													label={ __( 'Field value' ) }
													value={ item.field_value }
													onChange={ newValue => {
														updateItem( item, 'field_value', newValue, 'multiple_markers' )
													} }
												/> }
												{ 'post_term' === item.apply_type && <TextControl
													type="text"
													label={ __( 'Taxonomy slug' ) }
													help={ __( 'You can find this slug in the address bar of taxonomy edit page' ) }
													value={ item.tax_name }
													onChange={ newValue => {
														updateItem( item, 'tax_name', newValue, 'multiple_markers' )
													} }
												/> }
												{ 'post_term' === item.apply_type && <TextControl
													type="text"
													label={ __( 'Term name, slug or ID' ) }
													value={ item.term_name }
													onChange={ newValue => {
														updateItem( item, 'term_name', newValue, 'multiple_markers' )
													} }
												/> }
											</div>
									}
								</JetEngineRepeater> }

								<hr/>
								<ToggleControl
									label={ __( 'Marker Clustering' ) }
									checked={ attributes.marker_clustering }
									onChange={ () => {
										props.setAttributes( { marker_clustering: ! attributes.marker_clustering } );
									} }
								/>
							</PanelBody>
							<PanelBody
								title={ __( 'Popup' ) }
								initialOpen={ false }
							>
								<TextControl
									type="number"
									label={ __( 'Marker Popup Width' ) }
									help={ __( 'Set marker popup width in pixels' ) }
									value={ attributes.popup_width }
									min={ `150` }
									max={ `600` }
									onChange={ newValue => {
										props.setAttributes( { popup_width: Number(newValue) } );
									} }
								/>
								<TextControl
									type="number"
									label={ __( 'Vertical Offset' ) }
									help={ __( 'Set vertical popup offset in pixels' ) }
									value={ attributes.popup_offset }
									min={ `0` }
									max={ `200` }
									onChange={ newValue => {
										props.setAttributes( { popup_offset: Number(newValue) } );
									} }
								/>
								<ToggleControl
									label={ __( 'Add popup preloader' ) }
									help={ __( 'Add box with loading animation while popup data is fetching from the server' ) }
									checked={ attributes.popup_preloader }
									onChange={ () => {
										props.setAttributes( { popup_preloader: ! attributes.popup_preloader } );
									} }
								/>
								{ this.getCustomControlsSection( 'section_popup_settings' ) }
							</PanelBody>
							{ ! window.JetEngineListingData.legacy.is_disabled && <PanelBody
								title={ __( 'Custom Query' ) }
								initialOpen={ false }
							>
								<ToggleControl
									label={ __( 'Use Custom Query' ) }
									checked={ attributes.custom_query }
									onChange={ () => {
										props.setAttributes({ custom_query: ! attributes.custom_query });
									} }
								/>
								{ attributes.custom_query && <SelectControl
									multiple={false}
									label={ __( 'Custom Query' ) }
									value={ attributes.custom_query_id }
									options={ window.JetEngineListingData.queriesList }
									onChange={ newValue => {
										props.setAttributes( { custom_query_id: newValue } );
									}}
								/> }
							</PanelBody> }
							{ ! window.JetEngineListingData.legacy.is_disabled && <PanelBody
								title={ __( 'Posts Query' ) }
								initialOpen={ false }
							>
								<JetEngineRepeater
									data={ attributes.posts_query }
									default={{
										type: '',
									}}
									onChange={ newData => {
										props.setAttributes({ posts_query: newData });
									} }
								>
									{
										( item ) =>
											<div>
												<SelectControl
													label={ __( 'Type' ) }
													value={ item.type }
													options={ [
														{
															value: '',
															label: __( 'Select...' ),
														},
														{
															value: 'posts_params',
															label: __( 'Posts & Author Parameters' ),
														},
														{
															value: 'order_offset',
															label: __( 'Order & Offset' ),
														},
														{
															value: 'tax_query',
															label: __( 'Tax Query' ),
														},
														{
															value: 'meta_query',
															label: __( 'Meta Query' ),
														},
														{
															value: 'date_query',
															label: __( 'Date Query' ),
														},
													] }
													onChange={newValue => {
														updateItem( item, 'type', newValue )
													}}
												/>
												{ 'date_query' === item.type &&
												<div>
													<SelectControl
														label={ __( 'Column' ) }
														value={ item.date_query_column }
														options={ [
															{
																value: 'post_date',
																label: __( 'Post date' ),
															},
															{
																value: 'post_date_gmt',
																label: __( 'Post date GMT' ),
															},
															{
																value: 'post_modified',
																label: __( 'Post modified' ),
															},
															{
																value: 'post_modified_gmt',
																label: __( 'Post modified GMT' ),
															},
														] }
														onChange={newValue => {
															updateItem( item, 'date_query_column', newValue )
														}}
													/>
													<TextControl
														type="text"
														label={ __( 'After' ) }
														help={ __( 'Date to retrieve posts after. Accepts strtotime()-compatible string' ) }
														value={ item.date_query_after }
														onChange={newValue => {
															updateItem( item, 'date_query_after', newValue )
														}}
													/>
													<TextControl
														type="text"
														label={ __( 'Before' ) }
														help={ __( 'Date to retrieve posts before. Accepts strtotime()-compatible string' ) }
														value={ item.date_query_before }
														onChange={newValue => {
															updateItem( item, 'date_query_before', newValue )
														}}
													/>
												</div>
												}
												{ 'posts_params' === item.type &&
												<div>
													<TextControl
														type="text"
														label={ __( 'Include posts by IDs' ) }
														help={ __( 'Eg. 12, 24, 33' ) }
														value={ item.posts_in }
														onChange={newValue => {
															updateItem( item, 'posts_in', newValue )
														}}
													/>
													<TextControl
														type="text"
														label={ __( 'Exclude posts by IDs' ) }
														help={ __( 'Eg. 12, 24, 33. If this is used in the same query as Include posts by IDs, it will be ignored' ) }
														value={ item.posts_not_in }
														onChange={newValue => {
															updateItem( item, 'posts_not_in', newValue )
														}}
													/>
													<TextControl
														type="text"
														label={ __( 'Get child of' ) }
														help={ __( 'Eg. 12, 24, 33' ) }
														value={ item.posts_parent }
														onChange={newValue => {
															updateItem( item, 'posts_parent', newValue )
														}}
													/>
													<SelectControl
														label={ __( 'Post status' ) }
														value={ item.posts_status }
														options={ [
															{
																value: 'publish',
																label: __( 'Publish' ),
															},
															{
																value: 'pending',
																label: __( 'Pending' ),
															},
															{
																value: 'draft',
																label: __( 'Draft' ),
															},
															{
																value: 'auto-draft',
																label: __( 'Auto draft' ),
															},
															{
																value: 'future',
																label: __( 'Future' ),
															},
															{
																value: 'private',
																label: __( 'Private' ),
															},
															{
																value: 'trash',
																label: __( 'Trash' ),
															},
															{
																value: 'any',
																label: __( 'Any' ),
															},
														] }
														onChange={newValue => {
															updateItem( item, 'posts_status', newValue )
														}}
													/>
													<SelectControl
														label={ __( 'Posts by author' ) }
														value={ item.posts_author }
														options={ [
															{
																value: 'any',
																label: __( 'Any author' ),
															},
															{
																value: 'current',
																label: __( 'Current User' ),
															},
															{
																value: 'id',
																label: __( 'Specific Author ID' ),
															},
															{
																value: 'queried',
																label: __( 'Queried User' ),
															},
														] }
														onChange={newValue => {
															updateItem( item, 'posts_author', newValue )
														}}
													/>
													{
														'id' === item.posts_author &&
														<TextControl
															type="text"
															label={ __( 'Author ID' ) }
															value={ item.posts_author_id }
															onChange={newValue => {
																updateItem( item, 'posts_author_id', newValue )
															}}
														/>
													}
													<TextControl
														type="text"
														label={ __( 'Search Query' ) }
														value={ item.search_query }
														onChange={newValue => {
															updateItem( item, 'search_query', newValue )
														}}
													/>
												</div>
												}
												{ 'order_offset' === item.type &&
												<div>
													<TextControl
														type="number"
														label={ __( 'Posts offset' ) }
														value={ item.offset }
														min="0"
														max="100"
														step="1"
														onChange={newValue => {
															updateItem( item, 'offset', newValue )
														}}
													/>
													<SelectControl
														label={ __( 'Order' ) }
														value={ item.order }
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
														onChange={newValue => {
															updateItem( item, 'order', newValue )
														}}
													/>
													<SelectControl
														label={ __( 'Order' ) }
														value={ item.order_by }
														options={ [
															{
																value: 'none',
																label: __( 'None' ),
															},
															{
																value: 'ID',
																label: __( 'ID' ),
															},
															{
																value: 'author',
																label: __( 'Author' ),
															},
															{
																value: 'title',
																label: __( 'Title' ),
															},
															{
																value: 'name',
																label: __( 'Name' ),
															},
															{
																value: 'type',
																label: __( 'Type' ),
															},
															{
																value: 'date',
																label: __( 'Date' ),
															},
															{
																value: 'modified',
																label: __( 'Modified' ),
															},
															{
																value: 'parent',
																label: __( 'Parent' ),
															},
															{
																value: 'rand',
																label: __( 'Random' ),
															},
															{
																value: 'comment_count',
																label: __( 'Comment Count' ),
															},
															{
																value: 'relevance',
																label: __( 'Relevance' ),
															},
															{
																value: 'menu_order',
																label: __( 'Menu Order' ),
															},
															{
																value: 'meta_value',
																label: __( 'Meta Value' ),
															},
															{
																value: 'meta_clause',
																label: __( 'Meta Clause' ),
															},
															{
																value: 'post__in',
																label: __( 'Preserve post ID order given in the "Include posts by IDs" option' ),
															},
														] }
														onChange={newValue => {
															updateItem( item, 'order_by', newValue )
														}}
													/>
													{ 'meta_value' === item.order_by &&
													<div>
														<TextControl
															type="text"
															label={ __( 'Meta key to order' ) }
															help={ __( 'Set meta field name to order by' ) }
															value={ item.meta_key }
															onChange={newValue => {
																updateItem( item, 'meta_key', newValue )
															}}
														/>
														<SelectControl
															label={ __( 'Meta type' ) }
															value={ item.meta_type }
															options={ [
																{
																	value: 'CHAR',
																	label: 'CHAR',
																},
																{
																	value: 'NUMERIC',
																	label: 'NUMERIC',
																},
																{
																	value: 'DATE',
																	label: 'DATE',
																},
																{
																	value: 'DATETIME',
																	label: 'DATETIME',
																},
																{
																	value: 'DECIMAL',
																	label: 'DECIMAL',
																},
															] }
															onChange={newValue => {
																updateItem( item, 'meta_type', newValue )
															}}
														/>
													</div>
													}
													{ 'meta_clause' === item.order_by &&
													<TextControl
														type="text"
														label={ __( 'Meta clause to order' ) }
														help={ __( 'Meta clause name to order by. Clause with this name should be created in Meta Query parameters' ) }
														value={ item.meta_clause_key }
														onChange={newValue => {
															updateItem( item, 'meta_clause_key', newValue )
														}}
													/>
													}
												</div>
												}
												{ 'tax_query' === item.type &&
												<div>
													<SelectControl
														label={ __( 'Taxonomy' ) }
														value={ item.tax_query_taxonomy }
														options={ window.JetEngineListingData.taxonomies }
														onChange={newValue => {
															updateItem( item, 'tax_query_taxonomy', newValue )
														}}
													/>
													<SelectControl
														label={ __( 'Operator' ) }
														value={ item.tax_query_compare }
														options={ [
															{
																value: 'IN',
																label: 'IN',
															},
															{
																value: 'NOT IN',
																label: 'NOT IN',
															},
															{
																value: 'AND',
																label: 'AND',
															},
															{
																value: 'EXISTS',
																label: 'EXISTS',
															},
															{
																value: 'NOT EXISTS',
																label: 'NOT EXISTS',
															},
														] }
														onChange={newValue => {
															updateItem( item, 'tax_query_compare', newValue )
														}}
													/>
													<SelectControl
														label={ __( 'Field' ) }
														value={ item.tax_query_field }
														options={ [
															{
																value: 'term_id',
																label: __( 'Term ID' ),
															},
															{
																value: 'slug',
																label: __( 'Slug' ),
															},
															{
																value: 'name',
																label: __( 'Name' ),
															},
														] }
														onChange={newValue => {
															updateItem( item, 'tax_query_field', newValue )
														}}
													/>
													<TextControl
														type="text"
														label={ __( 'Terms' ) }
														value={ item.tax_query_terms }
														onChange={newValue => {
															updateItem( item, 'tax_query_terms', newValue )
														}}
													/>
													<TextControl
														type="text"
														label={ __( 'Terms from meta field' ) }
														help={ __( 'Get terms IDs from current page meta field' ) }
														value={ item.tax_query_terms_meta }
														onChange={newValue => {
															updateItem( item, 'tax_query_terms_meta', newValue )
														}}
													/>
												</div>
												}
												{ 'meta_query' === item.type &&
												<div>
													<TextControl
														label={ __( 'Key (name/ID)' ) }
														value={ item.meta_query_key }
														onChange={newValue => {
															updateItem( item, 'meta_query_key', newValue )
														}}
													/>
													<SelectControl
														label={ __( 'Operator' ) }
														value={ item.meta_query_compare }
														options={ [
															{
																value: '=',
																label: 'Equal',
															},
															{
																value: '!=',
																label: 'Not equal',
															},
															{
																value: '>',
																label: 'Greater than',
															},
															{
																value: '>=',
																label: 'Greater or equal',
															},
															{
																value: '<',
																label: 'Less than',
															},
															{
																value: '<=',
																label: 'Equal or less',
															},
															{
																value: 'LIKE',
																label: 'LIKE',
															},
															{
																value: 'NOT LIKE',
																label: 'NOT LIKE',
															},
															{
																value: 'IN',
																label: 'IN',
															},
															{
																value: 'NOT IN',
																label: 'NOT IN',
															},
															{
																value: 'BETWEEN',
																label: 'BETWEEN',
															},
															{
																value: 'NOT BETWEEN',
																label: 'NOT BETWEEN',
															},
															{
																value: 'EXISTS',
																label: 'EXISTS',
															},
															{
																value: 'NOT EXISTS',
																label: 'NOT EXISTS',
															},
															{
																value: 'REGEXP',
																label: 'REGEXP',
															},
															{
																value: 'NOT REGEXP',
																label: 'NOT REGEXP',
															},
														] }
														onChange={newValue => {
															updateItem( item, 'meta_query_compare', newValue )
														}}
													/>
													{ ! ['EXISTS', 'NOT EXISTS'].includes( item.meta_query_compare ) &&
													<div>
														<TextControl
															type="text"
															label={ __( 'Value' ) }
															help={ __( 'For "In", "Not in", "Between" and "Not between" compare separate multiple values with comma' ) }
															value={ item.meta_query_val }
															onChange={newValue => {
																updateItem( item, 'meta_query_val', newValue )
															}}
														/>
														<TextControl
															type="text"
															label={ __( 'Or get value from query variable' ) }
															help={ __( 'Set query variable name (from URL or WordPress query var) to get value from' ) }
															value={ item.meta_query_request_val }
															onChange={newValue => {
																updateItem( item, 'meta_query_request_val', newValue )
															}}
														/>
													</div>
													}
													<SelectControl
														label={ __( 'Type' ) }
														value={ item.meta_query_type }
														options={ metaTypes }
														onChange={newValue => {
															updateItem( item, 'meta_query_type', newValue )
														}}
													/>
													<TextControl
														type="text"
														label={ __( 'Meta Query Clause' ) }
														help={ __( 'Set unique name for current query clause to use it to order posts by this clause' ) }
														value={ item.meta_query_clause }
														onChange={newValue => {
															updateItem( item, 'meta_query_clause', newValue )
														}}
													/>
												</div>
												}
											</div>
									}
								</JetEngineRepeater>
								<SelectControl
									label={ __( 'Meta query relation' ) }
									value={ attributes.meta_query_relation }
									options={ [
										{
											value: 'AND',
											label: __( 'AND' ),
										},
										{
											value: 'OR',
											label: __( 'OR' ),
										}
									] }
									onChange={ newValue => {
										props.setAttributes( { meta_query_relation: newValue } );
									}}
								/>
								<SelectControl
									label={ __( 'Tax query relation' ) }
									value={ attributes.tax_query_relation }
									options={ [
										{
											value: 'AND',
											label: __( 'AND' ),
										},
										{
											value: 'OR',
											label: __( 'OR' ),
										}
									] }
									onChange={ newValue => {
										props.setAttributes( { tax_query_relation: newValue } );
									}}
								/>
							</PanelBody> }
							<PanelBody
								title={ __( 'Block Visibility' ) }
								initialOpen={ false }
							>
								<SelectControl
									label={ __( 'Hide block if' ) }
									value={ attributes.hide_widget_if }
									options={ hideOptions }
									onChange={ newValue => {
										props.setAttributes( { hide_widget_if: newValue } );
									} }
								/>
							</PanelBody>
						</InspectorControls>
					),
					<Disabled key={ 'block_render' }>
						<ServerSideRender
							block="jet-engine/maps-listing"
							attributes={ attributes }
						/>
					</Disabled>
				];
			}
		},
		save: props => {
			return null;
		}
	} );
}
