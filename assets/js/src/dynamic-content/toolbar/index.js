import DataSourceControls from "./data-source-controls";
import DataImageControls from "./data-image-controls";
import DataContextControls from "./data-context-controls";
import DataFilterControls from "./data-filter-controls";
import DynamicFunctions from "./dynamic-functions";
import Database from "../icons/database";
import DatabaseView from "../icons/database-view";

const {
	addFilter
} = wp.hooks;

const {
	ToolbarGroup,
	ToolbarButton,
	Button,
	Dropdown,
	MenuGroup,
	MenuItem,
	PanelBody
} = wp.components;

const {
	BlockControls
} = wp.blockEditor;

const {
	Fragment
} = wp.element;

addFilter(
	'jetEngine.dynamic.dataSourceControls',
	'jet-engine/dynamic-functions-controls',
	DynamicFunctions,
	900
);

const DynamicBlockControls = function( props ) {

	if ( ! props.attributes.jetEngineDynamicData ) {
		return ( null );
	}

	const supports   = wp.data.select( 'core/blocks' ).getBlockSupport( props.name, 'jetEngineDynamicData' );
	const attributes = props.attributes.jetEngineDynamicData;

	const getValue = function( key, attr, object ) {

		object = object || {};

		if ( ! key || ! attr ) {
			return null;
		}

		if ( ! object[ attr ] ) {
			return null;
		}

		return object[ attr ][ key ];
	};

	const getToken = function( attr, data ) {

		data = data || {};

		const keys = Object.keys( data );

		if ( ! keys.length ) {
			return;
		} else {
			return '%%' + attr + '%%';
		}

	}

	const resetValue = function( attr, dynamicAttributes, setAttributes, supports ) {

		setAttributes( {
			jetEngineDynamicData: _.assign( {}, dynamicAttributes, { [ attr ]: { data_source: '' } } ),
		} );

		for ( var i = 0; i < supports.length; i++ ) {

			if ( supports[ i ].attr === attr && supports[ i ].rewrite ) {

				let oldVal = props.attributes[ attr ];

				if ( 'string' === typeof oldVal ) {
					oldVal = oldVal.replace( '\%\%' + attr + '\%\%', '' );
				} else {
					let defaults = wp.blocks.getBlockAttributes( 'jet-engine/dynamic-field', '' ) || {};
					oldVal = defaults[ attr ] || '';
				}

				setAttributes( {
					[ attr ]: oldVal,
				} );
			} else if ( supports[ i ].attr === attr && 'image' === supports[ i ].type ) {
				setAttributes( {
					[ attr ]: '',
				} );
			}
		}

	}

	const hasToken = function( string, attr ) {
		if ( 'string' !== typeof string ) {
			return false;
		} else {
			return string.includes( '\%\%' + attr + '\%\%' );
		}
	}

	const setValue = function( newValue, key, attr, object, setAttributes, supports ) {

		const existingSettings = object[ attr ] || {};
		const newSettings = _.assign( {}, existingSettings, { [ key ]: newValue } );

		setAttributes( {
			jetEngineDynamicData: _.assign( {}, object, { [ attr ]: newSettings } ),
		} );

		if ( newValue ) {

			var token  = getToken( attr, newSettings );
			var oldVal = props.attributes[ attr ];

			for ( var i = 0; i < supports.length; i++ ) {

				if ( supports[ i ].attr === attr && supports[ i ].rewrite && token && ! hasToken( oldVal, attr ) ) {

					setAttributes( {
						[ attr ]: token,
					} );

					break;
				}

				if ( supports[ i ].attr === attr && 'image' === supports[ i ].type ) {

					setAttributes( {
						[ attr ]: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDI0MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjI0MCIgaGVpZ2h0PSIxNTAiIGZpbGw9IndoaXRlIi8+PHBhdGggZD0iTTY0IDEwM0w5MSA2Ni41TDEwNC41IDg0TDEzMy41IDQ2TDE3NiAxMDMiIHN0cm9rZT0iI0VDRUNFQyIgc3Ryb2tlLXdpZHRoPSI1IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48L3N2Zz4=",
					} );

					break;
				}

			}

		}

	};

	var hasDynamicData = false;

	for ( var i = 0; i < supports.length; i++ ) {
		if ( getValue( 'data_source', supports[ i ].attr, attributes ) ) {
			hasDynamicData = true;
			break;
		}
	}

	return (
		<BlockControls>
			<ToolbarGroup>
				<Dropdown
					className="jet-engine-dynamic-dropdown"
					contentClassName="jet-engine-dynamic-dropdown--content"
					position="bottom right"
					renderToggle={ ( { isOpen, onToggle } ) => (
						<ToolbarButton
							icon={ hasDynamicData ? DatabaseView : Database }
							label="Dynamic Content"
							onClick={ onToggle }
							aria-expanded={ isOpen }
						/>
					) }
					renderContent={ () => (
						<MenuGroup>
						{ supports.map( ( itemData, index ) => {
							return (
								<Dropdown
									className="jet-engine-dynamic-source"
									contentClassName="jet-engine-dynamic-source--inner-content"
									position="bottom right"
									key={ 'dynamic_control_' + itemData.attr + index }
									renderToggle={ ( { isOpen, onToggle } ) => {
										return <MenuItem
											key={ itemData.attr + index }
											className={ isOpen ? 'is-selected' : '' }
											onClick={ onToggle }
										>
											{ itemData.label }
											{ getValue( 'data_source', itemData.attr, attributes ) && DatabaseView }
										</MenuItem>;
									} }
									renderContent={ () => (
										<Fragment>
											<PanelBody
												title={ 'Data Source' }
												initialOpen={ true }
											>
												{ 'image' === itemData.type && <DataImageControls
													getValue={ getValue }
													setValue={ setValue }
													attr={ itemData.attr }
													attributes={ attributes }
													setAttributes={ props.setAttributes }
													supports={ supports }
												/> }
												{ ! itemData.type && <DataSourceControls
													getValue={ getValue }
													setValue={ setValue }
													attr={ itemData.attr }
													attributes={ attributes }
													setAttributes={ props.setAttributes }
													supports={ supports }
												/> }
											</PanelBody>
											<PanelBody
												title={ 'Data Context' }
												initialOpen={ false }
											>
												<DataContextControls
													getValue={ getValue }
													setValue={ setValue }
													attr={ itemData.attr }
													attributes={ attributes }
													setAttributes={ props.setAttributes }
													supports={ supports }
												/>
											</PanelBody>
											{ ! itemData.type && <PanelBody
												title={ 'Data Filter' }
												initialOpen={ false }
											>
												<DataFilterControls
													getValue={ getValue }
													setValue={ setValue }
													attr={ itemData.attr }
													attributes={ attributes }
													setAttributes={ props.setAttributes }
													supports={ supports }
												/>
											</PanelBody> }
											<Button
												isSmall={ true }
												variant="tertiary"
												isDestructive
												className="jet-engine-dynamic-source--reset"
												onClick={ () => {
													resetValue(
														itemData.attr,
														attributes,
														props.setAttributes,
														supports
													)
												} }
											>{ 'Reset' }</Button>
										</Fragment>
									) }

								/>
							);
						} ) }
						</MenuGroup>
					) }

				/>
			</ToolbarGroup>
		</BlockControls>
	);
}

export default DynamicBlockControls;
