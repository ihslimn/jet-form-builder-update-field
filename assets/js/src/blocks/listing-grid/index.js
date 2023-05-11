import GroupedSelectControl from "components/grouped-select-control.js";
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
	Fragment
} = wp.element;

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

const GIcon = <SVG width="46" height="24" viewBox="0 0 64 33" fill="none" xmlns="http://www.w3.org/2000/svg"><Path fillRule="evenodd" clipRule="evenodd" d="M0 4C0 1.79086 1.79086 0 4 0H16C18.2091 0 20 1.79086 20 4V16C20 18.2091 18.2091 20 16 20H4C1.79086 20 0 18.2091 0 16V4ZM4 2H16C17.1046 2 18 2.89543 18 4V16C18 17.1046 17.1046 18 16 18H4C2.89543 18 2 17.1046 2 16V4C2 2.89543 2.89543 2 4 2Z" fill="currentColor"/><Path fillRule="evenodd" clipRule="evenodd" d="M42 4V16C42 18.2091 40.2091 20 38 20H26C23.7909 20 22 18.2091 22 16V4C22 1.79086 23.7909 0 26 0H38C40.2091 0 42 1.79086 42 4ZM24 4C24 2.89543 24.8954 2 26 2H38C39.1046 2 40 2.89543 40 4V16C40 17.1046 39.1046 18 38 18H26C24.8954 18 24 17.1046 24 16V4Z" fill="currentColor"/><Path fillRule="evenodd" clipRule="evenodd" d="M44 16V4C44 1.79086 45.7909 0 48 0H60C62.2091 0 64 1.79086 64 4V16C64 18.2091 62.2091 20 60 20H48C45.7909 20 44 18.2091 44 16ZM46 4C46 2.89543 46.8954 2 48 2H60C61.1046 2 62 2.89543 62 4V16C62 17.1046 61.1046 18 60 18H48C46.8954 18 46 17.1046 46 16V4Z" fill="currentColor"/><Path d="M2 24C2 23.4477 2.44772 23 3 23H17C17.5523 23 18 23.4477 18 24C18 24.5523 17.5523 25 17 25H3C2.44772 25 2 24.5523 2 24Z" fill="currentColor"/><Path d="M2 28C2 27.4477 2.44772 27 3 27H17C17.5523 27 18 27.4477 18 28C18 28.5523 17.5523 29 17 29H3C2.44772 29 2 28.5523 2 28Z" fill="currentColor"/><Path d="M39 23H25C24.4477 23 24 23.4477 24 24C24 24.5523 24.4477 25 25 25H39C39.5523 25 40 24.5523 40 24C40 23.4477 39.5523 23 39 23Z" fill="currentColor"/><Path d="M24 32C24 31.4477 24.4477 31 25 31H31C31.5523 31 32 31.4477 32 32C32 32.5523 31.5523 33 31 33H25C24.4477 33 24 32.5523 24 32Z" fill="currentColor"/><Path d="M61 27H47C46.4477 27 46 27.4477 46 28C46 28.5523 46.4477 29 47 29H61C61.5523 29 62 28.5523 62 28C62 27.4477 61.5523 27 61 27Z" fill="currentColor"/><Path d="M3 31C2.44772 31 2 31.4477 2 32C2 32.5523 2.44772 33 3 33H9C9.55228 33 10 32.5523 10 32C10 31.4477 9.55228 31 9 31H3Z" fill="currentColor"/><Path d="M25 27C24.4477 27 24 27.4477 24 28C24 28.5523 24.4477 29 25 29H39C39.5523 29 40 28.5523 40 28C40 27.4477 39.5523 27 39 27H25Z" fill="currentColor"/><Path d="M47 23C46.4477 23 46 23.4477 46 24C46 24.5523 46.4477 25 47 25H61C61.5523 25 62 24.5523 62 24C62 23.4477 61.5523 23 61 23H47Z" fill="currentColor"/><Path d="M47 31C46.4477 31 46 31.4477 46 32C46 32.5523 46.4477 33 47 33H53C53.5523 33 54 32.5523 54 32C54 31.4477 53.5523 31 53 31H47Z" fill="currentColor"/></SVG>;

const blockAttributes = window.JetEngineListingData.atts.listingGrid;

registerBlockType( 'jet-engine/listing-grid', {
	title: __( 'Listing Grid' ),
	icon: GIcon,
	category: 'jet-engine',
	attributes: blockAttributes,
	className: 'jet-listing-grid',
	edit: class extends wp.element.Component {

		constructor( props ) {

			if ( ! props.attributes._block_id ) {
				props.setAttributes( { _block_id: props.clientId } );
			}

			super( props );
		}

		render() {

			const props          = this.props;
			const attributes     = props.attributes;
			const listingOptions = window.JetEngineListingData.listingOptions;
			const hideOptions    = window.JetEngineListingData.hideOptions;
			const taxonomies     = [];
			const conditions     = {};

			if ( ! window.JetEngineListingData.customPanles.listingGrid ) {
				window.JetEngineListingData.customPanles.listingGrid = [];
			}

			if ( window.JetEngineListingData.taxonomies.length ) {
				for ( var i = 0; i < window.JetEngineListingData.taxonomies.length; i++ ) {
					for ( var j = 0; j < window.JetEngineListingData.taxonomies[i].values.length; j++ ) {
						taxonomies.push( window.JetEngineListingData.taxonomies[i].values[j] );
					}
				}
			}

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
			]

			const updateItem = function( item, key, value, prop ) {

				prop = prop || 'posts_query';

				const query = clone( props.attributes[ prop ] );
				const index = getItemIndex( item );
				const currentItem = query[ getItemIndex( item, prop ) ];

				if ( ! currentItem ) {
					return;
				}

				currentItem[ key ] = value;
				query[ index ] = currentItem;

				props.setAttributes( { [ prop ]: query } );

			};

			const getItemIndex = function( item, prop ) {

				prop = prop || 'posts_query';

				return props.attributes[ prop ].findIndex( queryItem => {
					return queryItem == item;
				} );
			};

			const userRoles = window.JetEngineListingData.userRoles;

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
								}}
							/>
							<TextControl
								type="number"
								label={ __( 'Columns Number' ) }
								value={ attributes.columns }
								min={ `0` }
								max={ `6` }
								onChange={ newValue => {
									props.setAttributes( { columns: Number(newValue) } );
								} }
							/>
							<TextControl
								type="number"
								label={ __( 'Columns Number(Tablet)' ) }
								value={ attributes.columns_tablet }
								min={ `0` }
								max={ `6` }
								onChange={ newValue => {
									props.setAttributes( { columns_tablet: Number(newValue) } );
								} }
							/>
							<TextControl
								type="number"
								label={ __( 'Columns Number(Mobile)' ) }
								value={ attributes.columns_mobile }
								min={ `0` }
								max={ `6` }
								onChange={ newValue => {
									props.setAttributes( { columns_mobile: Number(newValue) } );
								} }
							/>
							<ToggleControl
								label={ __( 'Use as Archive Template' ) }
								checked={ attributes.is_archive_template }
								onChange={ () => {
									props.setAttributes({ is_archive_template: ! attributes.is_archive_template });
								} }
							/>
							<SelectControl
								multiple={true}
								label={ __( 'Status' ) }
								value={ attributes.post_status }
								options={ [
									{
										value: 'publish',
										label: __( 'Publish' ),
									},
									{
										value: 'future',
										label: __( 'Future' ),
									},
									{
										value: 'draft',
										label: __( 'Draft' ),
									},
									{
										value: 'pending',
										label: __( 'Pending Review' ),
									},
									{
										value: 'private',
										label: __( 'Private' ),
									},
								] }
								onChange={ newValue => {
									props.setAttributes( { post_status: newValue } );
								}}
							/>
							<ToggleControl
								label={ __( 'Use Random posts number' ) }
								checked={ attributes.use_random_posts_num }
								onChange={ () => {
									props.setAttributes({ use_random_posts_num: ! attributes.use_random_posts_num });
								} }
							/>
							<TextControl
								type="number"
								label={ attributes.use_random_posts_num ? __( 'Min posts number' ) : __( 'Posts number' ) }
								value={ attributes.posts_num }
								min={ `1` }
								max={ `1000` }
								onChange={ newValue => {
									props.setAttributes( { posts_num: Number(newValue) } );
								} }
							/>
							{ attributes.use_random_posts_num && <TextControl
								type="number"
								label={ __( 'Max Posts number' ) }
								value={ attributes.max_posts_num }
								min={ `1` }
								max={ `1000` }
								onChange={ newValue => {
									props.setAttributes( { max_posts_num: Number(newValue) } );
								} }
							/> }
							<TextControl
								type="text"
								label={ __( 'Not found message' ) }
								value={ attributes.not_found_message }
								onChange={ newValue => {
									props.setAttributes( { not_found_message: newValue } );
								} }
							/>
							<ToggleControl
								label={ __( 'Lazy load' ) }
								checked={ attributes.lazy_load }
								help={ __( 'Lazy load the listing for boosts rendering performance.' ) }
								onChange={ () => {
									props.setAttributes({ lazy_load: ! attributes.lazy_load });
								} }
							/>
							{ attributes.lazy_load &&
								<TextControl
									type="number"
									label={ __( 'Lazy load offset' ) }
									value={ attributes.lazy_load_offset }
									onChange={ newValue => {
										props.setAttributes( { lazy_load_offset: newValue } );
									} }
								/>
							}
							<ToggleControl
								label={ __( 'Is masonry grid' ) }
								checked={ attributes.is_masonry }
								onChange={ () => {
									props.setAttributes({ is_masonry: ! attributes.is_masonry });
								} }
							/>
							{ ! attributes.is_masonry && <ToggleControl
								label={ __( 'Equal columns height' ) }
								checked={ attributes.equal_columns_height }
								help={ __( 'Fits only top level sections of grid item' ) }
								onChange={ () => {
									props.setAttributes({ equal_columns_height: ! attributes.equal_columns_height });
								} }
							/> }
							<ToggleControl
								label={ __( 'Load more' ) }
								checked={ attributes.use_load_more }
								onChange={ () => {
									props.setAttributes({ use_load_more: ! attributes.use_load_more });
								} }
							/>
							{ attributes.use_load_more &&
								<SelectControl
									label={ __( 'Load more type' ) }
									value={ attributes.load_more_type }
									options={ [
										{
											value: 'click',
											label: __( 'By Click' ),
										},
										{
											value: 'scroll',
											label: __( 'Infinite Scroll' ),
										},
									] }
									onChange={ newValue => {
										props.setAttributes( { load_more_type: newValue } );
									}}
								/>
							}
							{ attributes.use_load_more && ( ! attributes.load_more_type || 'click' === attributes.load_more_type ) &&
								<TextControl
									type="text"
									label={ __( 'Load more element ID' ) }
									help={ __( 'Please, make sure to add a Button block that will be used as "Load more" button' ) }
									value={ attributes.load_more_id }
									onChange={ newValue => {
										props.setAttributes( { load_more_id: newValue } );
									} }
								/>
							}
							{ attributes.use_load_more && attributes.load_more_type && 'scroll' === attributes.load_more_type &&
								<TextControl
									type="number"
									label={ __( 'Load more offset' ) }
									value={ attributes.load_more_offset }
									onChange={ newValue => {
										props.setAttributes( { load_more_offset: Number(newValue) } );
									} }
								/>
							}
							{ attributes.use_load_more &&
								<div>
									<TextControl
										type="text"
										label={ __( 'Loader text' ) }
										value={ attributes.loader_text }
										onChange={ newValue => {
											props.setAttributes( { loader_text: newValue } );
										} }
									/>
									<ToggleControl
										label={ __( 'Show loader spinner' ) }
										checked={ attributes.loader_spinner }
										onChange={ () => {
											props.setAttributes( { loader_spinner: ! attributes.loader_spinner } );
										} }
									/>
									<hr/>
								</div>
							}
							{ ! window.JetEngineListingData.legacy.is_disabled && <Fragment>
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
									}}
								/> }
							</Fragment> }

							{ window.JetEngineListingData.injections.enabled &&
								<div>
									<ToggleControl
										label={ __( 'Inject alternative listing items' ) }
										checked={ attributes.inject_alternative_items }
										onChange={ () => {
											props.setAttributes({ inject_alternative_items: ! attributes.inject_alternative_items });
										} }
									/>
									{ attributes.inject_alternative_items &&
										<JetEngineRepeater
											data={ attributes.injection_items }
											default={{
												item: '',
												item_num: 2,
												item_colspan: 1,
												item_condition_type: 'on_item',
											}}
											onChange={ newData => {
												props.setAttributes({ injection_items: newData });
											} }
										>
											{
												( item ) =>
													<div>
														<SelectControl
															label={ __( 'Listing template' ) }
															value={ item.item }
															options={ listingOptions }
															onChange={ newValue => {
																updateItem( item, 'item', newValue, 'injection_items' )
															} }
														/>
														<SelectControl
															label={ __( 'Inject on' ) }
															value={ item.item_condition_type }
															options={ [
																{
																	value: '',
																	label: __( 'Select...' ),
																},
																{
																	value: 'on_item',
																	label: __( 'On each N item' ),
																},
																{
																	value: 'item_meta',
																	label: __( 'Depends on item meta field value' ),
																},
																{
																	value: 'has_terms',
																	label: __( 'If post has terms' ),
																},
																{
																	value: 'post_type',
																	label: __( 'If post type is' ),
																},
																{
																	value: 'term_tax',
																	label: __( 'If term taxonomy is' ),
																}
															] }
															onChange={ newValue => {
																updateItem( item, 'item_condition_type', newValue, 'injection_items' )
															} }
														/>
														{ 'on_item' === item.item_condition_type &&
															<div>
																<TextControl
																	type="number"
																	label={ __( 'Item number' ) }
																	value={ item.item_num }
																	min="-1000"
																	max="1000"
																	step="1"
																	onChange={ newValue => {
																		updateItem( item, 'item_num', newValue, 'injection_items' )
																	}}
																/>
																<SelectControl
																	label={ __( 'Start from first' ) }
																	value={ item.start_from_first }
																	help={ __( 'If checked - alternative item will be injected on first item and then on each N item after first. If not - on each N item from start. If "Item number" is negative converts into "Start from last"' ) }
																	options={ [
																		{
																			value: 0,
																			label: __( 'No' ),
																		},
																		{
																			value: 1,
																			label: __( 'Yes' ),
																		}
																	] }
																	onChange={ newValue => {
																		updateItem( item, 'start_from_first', newValue, 'injection_items' )
																	} }
																/>
															</div>
														}
														{ 'item_meta' === item.item_condition_type && <div>
																	<TextControl
																		type="text"
																		label={ __( 'Key (name/ID)' ) }
																		value={ item.meta_key }
																		onChange={ newValue => {
																			updateItem( item, 'meta_key', newValue, 'injection_items' )
																		}}
																	/>
																	<SelectControl
																		label={ __( 'Operator' ) }
																		value={ item.meta_key_compare }
																		options={ [
																			{
																				value: '=',
																				label: __( 'Equal' ),
																			},
																			{
																				value: '!=',
																				label: __( 'Not equal' ),
																			},
																			{
																				value: '>',
																				label: __( 'Greater than' ),
																			},
																			{
																				value: '>=',
																				label: __( 'Greater or equal' ),
																			},
																			{
																				value: '<',
																				label: __( 'Less than' ),
																			},
																			{
																				value: '<=',
																				label: __( 'Equal or less' ),
																			},
																			{
																				value: 'LIKE',
																				label: __( 'Like' ),
																			},
																			{
																				value: 'NOT LIKE',
																				label: __( 'Not like' ),
																			},
																			{
																				value: 'IN',
																				label: __( 'In' ),
																			},
																			{
																				value: 'NOT IN',
																				label: __( 'Not in' ),
																			},
																			{
																				value: 'BETWEEN',
																				label: __( 'Between' ),
																			},
																			{
																				value: 'NOT BETWEEN',
																				label: __( 'Not between' ),
																			},
																		] }
																		onChange={ newValue => {
																			updateItem( item, 'meta_key_compare', newValue, 'injection_items' )
																		} }
																	/>
																	<TextControl
																		type="text"
																		label={ __( 'Value' ) }
																		value={ item.meta_key_val }
																		help={ __( 'For "In", "Not in", "Between" and "Not between" compare separate multiple values with comma' ) }
																		onChange={ newValue => {
																			updateItem( item, 'meta_key_val', newValue, 'injection_items' )
																		}}
																	/>
															</div>
														}
														{ -1 !== ['has_terms', 'term_tax'].indexOf( item.item_condition_type ) &&
															<SelectControl
																label={ __( 'Taxonomy' ) }
																value={ item.tax }
																options={ taxonomies }
																onChange={ newValue => {
																	updateItem( item, 'tax', newValue, 'injection_items' )
																} }
															/>
														}
														{ 'has_terms' === item.item_condition_type &&
															<TextControl
																type="text"
																label={ __( 'Terms' ) }
																help={ __( 'Comma-separated string of term ids or slugs' ) }
																value={ item.terms }
																onChange={ newValue => {
																	updateItem( item, 'terms', newValue, 'injection_items' )
																} }
															/>
														}
														{ 'post_type' === item.item_condition_type &&
															<SelectControl
																label={ __( 'Post Type' ) }
																value={ item.post_type }
																options={ window.JetEngineListingData.postTypes }
																onChange={ newValue => {
																	updateItem( item, 'post_type', newValue, 'injection_items' )
																} }
															/>
														}
														<SelectControl
															label={ __( 'Inject this item only once' ) }
															value={ item.inject_once }
															options={ [
																{
																	value: 0,
																	label: __( 'No' ),
																},
																{
																	value: 1,
																	label: __( 'Yes' ),
																}
															] }
															onChange={ newValue => {
																updateItem( item, 'inject_once', newValue, 'injection_items' )
															} }
														/>
														<RangeControl
															label={ __( 'Column span' ) }
															min="1"
															max="6"
															help={ __( 'Note: Can`t be bigger than Columns Number value' ) }
															value={ item.item_colspan }
															onChange={ newValue => {
																updateItem( item, 'item_colspan', newValue, 'injection_items' )
															}}
														/>
														<SelectControl
															label={ __( 'Static item' ) }
															value={ item.static_item }
															help={ __( 'If checked - alternative item will be injected without current post context. Use this to inject static items into listing.' ) }
															options={ [
																{
																	value: 0,
																	label: __( 'No' ),
																},
																{
																	value: 1,
																	label: __( 'Yes' ),
																}
															] }
															onChange={ newValue => {
																updateItem( item, 'static_item', newValue, 'injection_items' )
															} }
														/>
														{ 1 == item.static_item && <SelectControl
															label={ __( 'Static item context' ) }
															value={ item.static_item_context }
															help={ __( 'Select object to to use as default inside static item' ) }
															options={ window.JetEngineListingData.allowedContextList }
															onChange={ newValue => {
																updateItem( item, 'static_item_context', newValue, 'injection_items' )
															} }
														/> }
													</div>
											}
										</JetEngineRepeater>
									}
								</div>
							}
						 	<div dangerouslySetInnerHTML={ { __html: window.JetEngineListingData.legacy.message } }></div>
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
													{ window.JetEngineListingData.dataStores && window.JetEngineListingData.dataStores.length &&
														<SelectControl
															label={ __( 'Get posts from store' ) }
															value={ item.posts_from_data_store }
															options={ JetEngineListingData.dataStores }
															onChange={ newValue => {
																updateItem( item, 'posts_from_data_store', newValue )
															}}
														/>
													}
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
																value: '',
																label: __( 'Select...' ),
															},
															{
																value: 'DESC',
																label: __( 'DESC' ),
															},
															{
																value: 'ASC',
																label: __( 'ASC' ),
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
														options={ taxonomies }
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
							<TextareaControl
								type="text"
								label={ __( 'Set Posts Query' ) }
								value={ attributes.custom_posts_query }
								onChange={ newValue => {
									props.setAttributes( { custom_posts_query: newValue } );
								} }
							/>
							<p>
								<ExternalLink href="https://crocoblock.com/wp-query-generator/">{ __( 'Generate Posts Query' ) }</ExternalLink>
							</p>
							<p>
								<ExternalLink href="https://crocoblock.com/knowledge-base/articles/jetengine-macros-guide/">{ __( 'Macros Guide' ) }</ExternalLink>
							</p>
						</PanelBody> }
						{ ! window.JetEngineListingData.legacy.is_disabled && <PanelBody
							title={ __( 'Terms Query' ) }
							initialOpen={ false }
						>
							<TextControl
								type="text"
								label={ __( 'Get terms of posts' ) }
								value={ attributes.terms_object_ids }
								onChange={ newValue => {
									props.setAttributes( { terms_object_ids: newValue } );
								}}
							/>
							<SelectControl
								label={ __( 'Order By' ) }
								value={ attributes.terms_orderby }
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
										value: 'count',
										label: __( 'Count' ),
									},
									{
										value: 'include',
										label: __( 'Include' ),
									},
									{
										value: 'none',
										label: __( 'None' ),
									},
								] }
								onChange={ newValue => {
									props.setAttributes( { terms_orderby: newValue } );
								}}
							/>
							<SelectControl
								label={ __( 'Order' ) }
								value={ attributes.terms_order }
								options={ [
									{
										value: '',
										label: 'Select...',
									},
									{
										value: 'DESC',
										label: 'DESC',
									},
									{
										value: 'ASC',
										label: 'ASC',
									},
								] }
								onChange={ newValue => {
									props.setAttributes( { terms_order: newValue } );
								}}
							/>
							<ToggleControl
								label={ __( 'Hide empty' ) }
								checked={ attributes.terms_hide_empty }
								onChange={ () => {
									props.setAttributes( { terms_hide_empty: ! attributes.terms_hide_empty } );
								} }
							/>
							<TextControl
								type="text"
								label={ __( 'Include terms' ) }
								help={ __( 'Comma/space-separated string of term ids to include' ) }
								value={ attributes.terms_include }
								onChange={ newValue => {
									props.setAttributes( { terms_include: newValue } );
								}}
							/>
							<TextControl
								type="text"
								label={ __( 'Exclude terms' ) }
								help={ __( 'Comma/space-separated string of term ids to exclude. Ignored if "Include terms" not empty' ) }
								value={ attributes.terms_exclude }
								onChange={ newValue => {
									props.setAttributes( { terms_exclude: newValue } );
								}}
							/>
							<TextControl
								type="number"
								min="0"
								max="100"
								label={ __( 'Offset' ) }
								value={ attributes.terms_offset }
								onChange={ newValue => {
									props.setAttributes( { terms_offset: newValue } );
								}}
							/>
							<TextControl
								type="text"
								label={ __( 'Parent' ) }
								help={ __( 'Term ID to retrieve only direct descendants. Set 0 to show only the top-level terms' ) }
								value={ attributes.terms_parent }
								onChange={ newValue => {
									props.setAttributes( { terms_parent: newValue } );
								}}
							/>
							<TextControl
								type="text"
								label={ __( 'Child of' ) }
								help={ __( 'Term ID to retrieve child terms of' ) }
								value={ attributes.terms_child_of }
								onChange={ newValue => {
									props.setAttributes( { terms_child_of: newValue } );
								}}
							/>
							<div className="jet-engine-heading">Meta Query</div>
							<JetEngineRepeater
								data={ attributes.terms_meta_query }
								default={{
									meta_query_key: '',
								}}
								onChange={ newData => {
									props.setAttributes({ terms_meta_query: newData });
								} }
							>
								{
									( item ) =>
										<div>
											<TextControl
												type="text"
												label={ __( 'Key (name/ID)' ) }
												value={ item.meta_query_key }
												onChange={ newValue => {
													updateItem( item, 'meta_query_key', newValue, 'terms_meta_query' )
												} }
											/>
											<SelectControl
												label={ __( 'Operator' ) }
												value={ item.meta_query_compare }
												options={ [
													{
														value: '=',
														label: __( 'Equal' ),
													},
													{
														value: '!=',
														label: __( 'Not equal' ),
													},
													{
														value: '>',
														label: __( 'Greater than' ),
													},
													{
														value: '>=',
														label: __( 'Greater or equal' ),
													},
													{
														value: '<',
														label: __( 'Less than' ),
													},
													{
														value: '<=',
														label: __( 'Equal or less' ),
													},
													{
														value: 'LIKE',
														label: __( 'Like' ),
													},
													{
														value: 'NOT LIKE',
														label: __( 'Not like' ),
													},
													{
														value: 'IN',
														label: __( 'In' ),
													},
													{
														value: 'NOT IN',
														label: __( 'Not in' ),
													},
													{
														value: 'BETWEEN',
														label: __( 'Between' ),
													},
													{
														value: 'NOT BETWEEN',
														label: __( 'Not between' ),
													},
													{
														value: 'EXISTS',
														label: __( 'Exists' ),
													},
													{
														value: 'NOT EXISTS',
														label: __( 'Not Exists' ),
													},
												] }
												onChange={ newValue => {
													updateItem( item, 'meta_query_compare', newValue, 'terms_meta_query' )
												} }
											/>
											<TextControl
												type="text"
												label={ __( 'Value' ) }
												value={ item.meta_query_val }
												help={ __( 'For "In", "Not in", "Between" and "Not between" compare separate multiple values with comma' ) }
												onChange={ newValue => {
													updateItem( item, 'meta_query_val', newValue, 'terms_meta_query' )
												} }
											/>
											<SelectControl
												label={ __( 'Type' ) }
												value={ item.meta_query_type }
												options={ metaTypes }
												onChange={ newValue => {
													updateItem( item, 'meta_query_type', newValue, 'terms_meta_query' )
												} }
											/>
										</div>
								}
							</JetEngineRepeater>
							<SelectControl
								label={ __( 'Meta query relation' ) }
								value={ attributes.term_meta_query_relation }
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
									props.setAttributes( { term_meta_query_relation: newValue } );
								}}
							/>
						</PanelBody> }
						{ ! window.JetEngineListingData.legacy.is_disabled && <PanelBody
							title={ __( 'Users Query' ) }
							initialOpen={ false }
						>
							<SelectControl
								label={ __( 'Roles' ) }
								value={ attributes.users_role__in }
								options={ userRoles }
								multiple={ true }
								onChange={ newValue => {
									props.setAttributes( { users_role__in: newValue } );
								}}
							/>
							<SelectControl
								label={ __( 'Exclude roles' ) }
								value={ attributes.users_role__not_in }
								options={ userRoles }
								multiple={ true }
								onChange={ newValue => {
									props.setAttributes( { users_role__not_in: newValue } );
								}}
							/>
							<TextControl
								type="text"
								label={ __( 'Include users by ID' ) }
								help={ __( 'Comma-separated IDs list' ) }
								value={ attributes.users_include }
								onChange={ newValue => {
									props.setAttributes( { users_include: newValue } );
								}}
							/>
							<TextControl
								type="text"
								label={ __( 'Exclude users by ID' ) }
								help={ __( 'Comma-separated IDs list' ) }
								value={ attributes.users_exclude }
								onChange={ newValue => {
									props.setAttributes( { users_exclude: newValue } );
								}}
							/>
							<TextControl
								type="text"
								label={ __( 'Search Query' ) }
								value={ attributes.users_search_query }
								onChange={ newValue => {
									props.setAttributes( { users_search_query: newValue } );
								}}
							/>
							{ attributes.users_search_query && <SelectControl
								label={ __( 'Search Columns' ) }
								value={ attributes.users_search_columns }
								multiple={ true }
								options={ [
									{
										value: 'ID',
										label: __( 'User id' ),
									},
									{
										value: 'user_login',
										label: __( 'Login' ),
									},
									{
										value: 'user_nicename',
										label: __( 'Nicename' ),
									},
									{
										value: 'user_email',
										label: __( 'Email' ),
									},
									{
										value: 'user_url',
										label: __( 'User url' ),
									},
								] }
								onChange={ newValue => {
									props.setAttributes( { users_search_columns: newValue } );
								}}
							/> }
							<div className="jet-engine-heading">Meta Query</div>
							<JetEngineRepeater
								data={ attributes.users_meta_query }
								default={{
									meta_query_key: '',
								}}
								onChange={ newData => {
									props.setAttributes({ users_meta_query: newData });
								} }
							>
								{
									( item ) =>
										<div>
											<TextControl
												type="text"
												label={ __( 'Key (name/ID)' ) }
												value={ item.meta_query_key }
												onChange={ newValue => {
													updateItem( item, 'meta_query_key', newValue, 'users_meta_query' )
												} }
											/>
											<SelectControl
												label={ __( 'Operator' ) }
												value={ item.meta_query_compare }
												options={ [
													{
														value: '=',
														label: __( 'Equal' ),
													},
													{
														value: '!=',
														label: __( 'Not equal' ),
													},
													{
														value: '>',
														label: __( 'Greater than' ),
													},
													{
														value: '>=',
														label: __( 'Greater or equal' ),
													},
													{
														value: '<',
														label: __( 'Less than' ),
													},
													{
														value: '<=',
														label: __( 'Equal or less' ),
													},
													{
														value: 'LIKE',
														label: __( 'Like' ),
													},
													{
														value: 'NOT LIKE',
														label: __( 'Not like' ),
													},
													{
														value: 'IN',
														label: __( 'In' ),
													},
													{
														value: 'NOT IN',
														label: __( 'Not in' ),
													},
													{
														value: 'BETWEEN',
														label: __( 'Between' ),
													},
													{
														value: 'NOT BETWEEN',
														label: __( 'Not between' ),
													},
													{
														value: 'EXISTS',
														label: __( 'Exists' ),
													},
													{
														value: 'NOT EXISTS',
														label: __( 'Not Exists' ),
													},
												] }
												onChange={ newValue => {
													updateItem( item, 'meta_query_compare', newValue, 'users_meta_query' )
												} }
											/>
											<TextControl
												type="text"
												label={ __( 'Value' ) }
												value={ item.meta_query_val }
												help={ __( 'For "In", "Not in", "Between" and "Not between" compare separate multiple values with comma' ) }
												onChange={ newValue => {
													updateItem( item, 'meta_query_val', newValue, 'users_meta_query' )
												} }
											/>
											<SelectControl
												label={ __( 'Type' ) }
												value={ item.meta_query_type }
												options={ metaTypes }
												onChange={ newValue => {
													updateItem( item, 'meta_query_type', newValue, 'users_meta_query' )
												} }
											/>
										</div>
								}
							</JetEngineRepeater>
							<SelectControl
								label={ __( 'Meta query relation' ) }
								value={ attributes.users_meta_query_relation }
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
									props.setAttributes( { users_meta_query_relation: newValue } );
								}}
							/>
						</PanelBody> }
						{ ! window.JetEngineListingData.legacy.is_disabled && window.JetEngineListingData.customPanles.listingGrid.length && <React.Fragment>
							{ window.JetEngineListingData.customPanles.listingGrid.map( ( Panel ) => {
								return <Panel
									attributes={ props.attributes }
									onChange={ ( data ) => {
										props.setAttributes( data );
									} }
								/>
							} ) }
						</React.Fragment> }
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
								}}
							/>
						</PanelBody>
						<PanelBody
							title={ __( 'Slider Settings' ) }
							initialOpen={ false }
						>
							{ ! attributes.is_masonry && ! attributes.scroll_slider_enabled && <ToggleControl
								label={ __( 'Enable Slider' ) }
								checked={ attributes.carousel_enabled }
								onChange={ () => {
									props.setAttributes( { carousel_enabled: ! attributes.carousel_enabled } );
								} }
							/> }
							{ ! attributes.is_masonry && ! attributes.scroll_slider_enabled && attributes.carousel_enabled && <div>
									<RangeControl
										label={ __( 'Slides to Scroll' ) }
										min="1"
										max="4"
										withInputField={ false }
										value={ attributes.slides_to_scroll }
										onChange={ newValue => {
											props.setAttributes( { slides_to_scroll: newValue } );
										}}
									/>
									<ToggleControl
										label={ __( 'Show Arrows Navigation' ) }
										checked={ attributes.arrows }
										onChange={ () => {
											props.setAttributes( { arrows: ! attributes.arrows } );
										} }
									/>
									<ToggleControl
										label={ __( 'Show Dots Navigation' ) }
										checked={ attributes.dots }
										onChange={ () => {
											props.setAttributes( { dots: ! attributes.dots } );
										} }
									/>
									<ToggleControl
										label={ __( 'Autoplay' ) }
										checked={ attributes.autoplay }
										onChange={ () => {
											props.setAttributes( { autoplay: ! attributes.autoplay } );
										} }
									/>
									{ attributes.autoplay &&
										<TextControl
											type="number"
											label={ __( 'Autoplay Speed' ) }
											value={ attributes.autoplay_speed }
											onChange={ newValue => {
												props.setAttributes( { autoplay_speed: newValue } );
											}}
										/>
									}
									<SelectControl
										label={ __( 'Effect' ) }
										value={ attributes.effect }
										options={ [
											{
												value: 'slide',
												label: __( 'Slide' ),
											},
											{
												value: 'fade',
												label: __( 'Fade' ),
											},
										] }
										onChange={ newValue => {
											props.setAttributes( { effect: newValue } );
										} }
									/>
									<ToggleControl
										label={ __( 'Infinite Loop' ) }
										checked={ attributes.infinite }
										onChange={ () => {
											props.setAttributes({ infinite: ! attributes.infinite });
										} }
									/>
									<ToggleControl
										label={ __( 'Center Mode' ) }
										checked={ attributes.center_mode }
										onChange={ () => {
											props.setAttributes({ center_mode: ! attributes.center_mode });
										} }
									/>
									<TextControl
										type="number"
										label={ __( 'Animation Speed' ) }
										value={ attributes.speed }
										onChange={ newValue => {
											props.setAttributes( { speed: newValue } );
										}}
									/>
								</div>
							}
							{ ! attributes.is_masonry && ! attributes.carousel_enabled && <ToggleControl
								label={ __( 'Enable Scroll Slider' ) }
								checked={ attributes.scroll_slider_enabled }
								onChange={ () => {
									props.setAttributes( { scroll_slider_enabled: ! attributes.scroll_slider_enabled } );
								} }
							/> }
							{ ! attributes.is_masonry && ! attributes.carousel_enabled && attributes.scroll_slider_enabled && <div>
									<SelectControl
										label={ __( 'Scroll Slider On' ) }
										multiple={ true }
										value={ attributes.scroll_slider_on }
										options={ [
											{
												value: 'desktop',
												label: __( 'Desktop' ),
											},
											{
												value: 'tablet',
												label: __( 'Tablet' ),
											},
											{
												value: 'mobile',
												label: __( 'Mobile' ),
											},
										] }
										onChange={ newValue => {
											props.setAttributes( { scroll_slider_on: newValue } );
										} }
									/>
									{ attributes.scroll_slider_on && attributes.scroll_slider_on.length && <RangeControl
										label={ __( 'Static column width' ) }
										min="0"
										max="600"
										value={ attributes.static_column_width }
										onChange={ newValue => {
											props.setAttributes( { static_column_width: newValue } );
										} }
									/> }
								</div>
							}
						</PanelBody>
					</InspectorControls>
				),
				<Disabled key={ 'block_render' }>
					<ServerSideRender
						block="jet-engine/listing-grid"
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
