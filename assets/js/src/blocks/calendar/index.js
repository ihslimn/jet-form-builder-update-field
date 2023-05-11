import JetEngineRepeater from "components/repeater-control.js";

import {
	clone
} from '../../utils/utility';

const { __ } = wp.i18n;
const {
	registerBlockType
} = wp.blocks;

const {
	InspectorControls
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

if ( -1 !== window.JetEngineListingData.activeModules.indexOf( 'calendar' ) ) {
	const GIcon = <SVG width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><Path d="M58.207 4.01185C58.6523 3.54777 58.875 2.9921 58.875 2.34483C58.875 1.69756 58.6523 1.14799 58.207 0.696121C57.7734 0.23204 57.2461 0 56.625 0C56.0039 0 55.4707 0.23204 55.0254 0.696121C54.5918 1.14799 54.375 1.69756 54.375 2.34483C54.375 2.9921 54.5918 3.54777 55.0254 4.01185C55.4707 4.46372 56.0039 4.68966 56.625 4.68966C57.2461 4.68966 57.7734 4.46372 58.207 4.01185Z" fill="currentColor"/><Path d="M58.875 6.44828C59.1914 6.44828 59.4551 6.5643 59.666 6.79634C59.8887 7.02838 60 7.30927 60 7.63901C60 7.95654 59.8887 8.22521 59.666 8.44504L57.9785 10.2037C57.873 10.3258 57.75 10.4174 57.6094 10.4784C57.4688 10.5273 57.3281 10.5517 57.1875 10.5517C57.0469 10.5517 56.9062 10.5273 56.7656 10.4784C56.625 10.4174 56.502 10.3258 56.3965 10.2037L53.5312 7.23599L51.668 9.15948L54.9727 11.3211C55.1016 11.4066 55.207 11.5165 55.2891 11.6509C55.3828 11.773 55.4473 11.9134 55.4824 12.0722C55.5059 12.2188 55.5 12.3714 55.4648 12.5302C55.4414 12.6889 55.3887 12.8355 55.3066 12.9698L53.0566 16.4871C52.9512 16.6458 52.8105 16.768 52.6348 16.8534C52.4707 16.9511 52.3008 17 52.125 17C52.0195 17 51.9141 16.9817 51.8086 16.945C51.7031 16.9206 51.5977 16.8718 51.4922 16.7985C51.2344 16.6275 51.0762 16.3833 51.0176 16.0657C50.959 15.7482 51.0176 15.4551 51.1934 15.1864L52.793 12.6584L50.4727 11.1562C50.1797 10.9608 49.9395 10.7166 49.752 10.4235C49.5762 10.1182 49.4707 9.78843 49.4355 9.43427C49.4004 9.0801 49.4355 8.73815 49.541 8.40841C49.6582 8.06645 49.8398 7.76724 50.0859 7.51078L51.9316 5.56897L50.4375 4.01185L48.9785 5.51401C48.7676 5.74605 48.5039 5.86207 48.1875 5.86207C47.8711 5.86207 47.6074 5.74605 47.3965 5.51401C47.1738 5.28197 47.0625 5.00718 47.0625 4.68966C47.0625 4.35991 47.1738 4.08513 47.3965 3.8653L49.6465 1.52047C49.8574 1.28843 50.1211 1.17241 50.4375 1.17241C50.7539 1.17241 51.0176 1.28843 51.2285 1.52047L57.1875 7.71228L58.084 6.79634C58.2949 6.5643 58.5586 6.44828 58.875 6.44828Z" fill="currentColor"/><Path d="M46.043 11.7241L47.1504 10.5517C47.373 10.3197 47.6367 10.2037 47.9414 10.2037C48.2578 10.2037 48.5273 10.3197 48.75 10.5517C48.9727 10.7838 49.084 11.0647 49.084 11.3944C49.084 11.7119 48.9727 11.9867 48.75 12.2188L47.291 13.7209C47.1855 13.8308 47.0625 13.9163 46.9219 13.9774C46.793 14.0384 46.6523 14.069 46.5 14.069H43.125C42.8086 14.069 42.5391 13.9591 42.3164 13.7392C42.1055 13.5072 42 13.2263 42 12.8966C42 12.5668 42.1055 12.292 42.3164 12.0722C42.5391 11.8402 42.8086 11.7241 43.125 11.7241H46.043Z" fill="currentColor"/><Path fillRule="evenodd" clipRule="evenodd" d="M11 15C10.4477 15 10 15.4477 10 16V18H4C1.79086 18 0 19.7909 0 22V56C0 58.2091 1.79086 60 4 60H38C40.2091 60 42 58.2091 42 56V22C42 19.7909 40.2091 18 38 18H32V16C32 15.4477 31.5523 15 31 15C30.4477 15 30 15.4477 30 16V18H12V16C12 15.4477 11.5523 15 11 15ZM30 22V20H12V22C12 22.5523 11.5523 23 11 23C10.4477 23 10 22.5523 10 22V20H4C2.89543 20 2 20.8954 2 22V30H40V22C40 20.8954 39.1046 20 38 20H32V22C32 22.5523 31.5523 23 31 23C30.4477 23 30 22.5523 30 22ZM40 56V32H2V56C2 57.1046 2.89543 58 4 58H38C39.1046 58 40 57.1046 40 56Z" fill="currentColor"/></SVG>;
	
	const blockAttributes = window.JetEngineListingData.atts.listingCalendar;

	registerBlockType( 'jet-engine/listing-calendar', {
		title: __( 'Listing Calendar' ),
		icon: GIcon,
		category: 'jet-engine',
		attributes: blockAttributes,
		className: 'jet-listing-calendar',
		edit: class extends wp.element.Component {

			constructor( props ) {

				if ( ! props.attributes._block_id ) {
					props.setAttributes( { _block_id: props.clientId } );
				}

				super( props );
			}

			render() {

				const props            = this.props;
				const attributes       = props.attributes;
				const listingOptions   = window.JetEngineListingData.listingOptions;
				const hideOptions      = window.JetEngineListingData.hideOptions;

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
								<SelectControl
									label={ __( 'Group posts by' ) }
									value={ attributes.group_by }
									options={ blockAttributes.group_by.options }
									onChange={ newValue => {
										props.setAttributes( { group_by: newValue } );
									} }
								/>
								{ 'meta_date' === attributes.group_by &&
									<TextControl
										type="text"
										label={ __( 'Meta field name' ) }
										help={ __( 'This field must contain date to group posts by. Works only if "Save as timestamp" option for meta field is active' ) }
										value={ attributes.group_by_key }
										onChange={ newValue => {
											props.setAttributes( { group_by_key: newValue } );
										} }
									/>
								}
								{ 'meta_date' === attributes.group_by && <ToggleControl
									label={ __( 'Allow multi-day events' ) }
									checked={ attributes.allow_multiday }
									onChange={ () => {
										props.setAttributes( { allow_multiday: ! attributes.allow_multiday } );
									} }
								/> }
								{ 'meta_date' === attributes.group_by && attributes.allow_multiday &&
									<TextControl
										type="text"
										label={ __( 'End date field name' ) }
										help={ __( 'This field must contain date when events ends. Works only if "Save as timestamp" option for meta field is active' ) }
										value={ attributes.end_date_key }
										onChange={ newValue => {
											props.setAttributes( { end_date_key: newValue } );
										} }
									/>
								}
								<ToggleControl
									label={ __( 'Use Custom Post Types' ) }
									checked={ attributes.use_custom_post_types }
									onChange={ () => {
										props.setAttributes({ use_custom_post_types: ! attributes.use_custom_post_types });
									} }
								/>
								{ attributes.use_custom_post_types && <SelectControl
									multiple={true}
									label={ __( 'Post types' ) }
									value={ attributes.custom_post_types }
									options={ window.JetEngineListingData.postTypes }
									onChange={ newValue => {
										props.setAttributes( { custom_post_types: newValue } );
									} }
								/> }
								<hr/>
								<SelectControl
									label={ __( 'Week days format' ) }
									value={ attributes.week_days_format }
									options={ [
										{
											value: 'full',
											label: __( 'Full' ),
										},
										{
											value: 'short',
											label: __( 'Short' ),
										},
										{
											value: 'initial',
											label: __( 'Initial letter' ),
										},
									] }
									onChange={ newValue => {
										props.setAttributes( { week_days_format: newValue } );
									} }
								/>
								<ToggleControl
									label={ __( 'Start from custom month' ) }
									checked={ attributes.custom_start_from }
									onChange={ () => {
										props.setAttributes( { custom_start_from: ! attributes.custom_start_from } );
									} }
								/>
								{ attributes.custom_start_from &&
									<SelectControl
										label={ __( 'Start from month' ) }
										value={ attributes.start_from_month }
										options={ [
											{
												value: 'January',
												label: __( 'January' ),
											},
											{
												value: 'February',
												label: __( 'February' ),
											},
											{
												value: 'March',
												label: __( 'March' ),
											},
											{
												value: 'April',
												label: __( 'April' ),
											},
											{
												value: 'May',
												label: __( 'May' ),
											},
											{
												value: 'June',
												label: __( 'June' ),
											},
											{
												value: 'July',
												label: __( 'July' ),
											},
											{
												value: 'August',
												label: __( 'August' ),
											},
											{
												value: 'September',
												label: __( 'September' ),
											},
											{
												value: 'October',
												label: __( 'October' ),
											},
											{
												value: 'November',
												label: __( 'November' ),
											},
											{
												value: 'December',
												label: __( 'December' ),
											},
										] }
										onChange={ newValue => {
											props.setAttributes( { start_from_month: newValue } );
										} }
									/>
								}
								{ attributes.custom_start_from &&
									<TextControl
										type="text"
										label={ __( 'Start from year' ) }
										value={ attributes.start_from_year }
										onChange={ newValue => {
											props.setAttributes( { start_from_year: newValue } );
										} }
									/>
								}
								<ToggleControl
									label={ __( 'Show posts from the nearby months' ) }
									checked={ attributes.show_posts_nearby_months }
									onChange={ () => {
										props.setAttributes( { show_posts_nearby_months: ! attributes.show_posts_nearby_months } );
									} }
								/>
								<ToggleControl
									label={ __( 'Hide past events' ) }
									checked={ attributes.hide_past_events }
									onChange={ () => {
										props.setAttributes( { hide_past_events: ! attributes.hide_past_events } );
									} }
								/>
								<SelectControl
									label={ __( 'Caption Layout' ) }
									value={ attributes.caption_layout }
									options={ [
										{
											value: 'layout-1',
											label: __( 'Layout 1' ),
										},
										{
											value: 'layout-2',
											label: __( 'Layout 2' ),
										},
										{
											value: 'layout-3',
											label: __( 'Layout 3' ),
										},
										{
											value: 'layout-4',
											label: __( 'Layout 4' ),
										},

									] }
									onChange={ newValue => {
										props.setAttributes( { caption_layout: newValue } );
									} }
								/>
							</PanelBody>
							<PanelBody
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
							</PanelBody>
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
							block="jet-engine/listing-calendar"
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
