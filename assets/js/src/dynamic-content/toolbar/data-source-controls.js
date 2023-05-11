import MacrosControl from "./macros-control.js";
import GroupedSelectControl from "components/grouped-select-control.js";

const {
	TextControl,
	SelectControl,
	withFilters
} = wp.components;

const {
	Fragment
} = wp.element;

class DataSourceControls extends wp.element.Component {

	render() {

		const {
			getValue,
			attr,
			attributes,
			setAttributes,
			setValue,
			supports
		} = this.props;

		const objectFields = window.JetEngineListingData.objectFields;
		const dataSources  = window.JetEngineListingData.dynamicDataSources;

		return <Fragment>
			<SelectControl
				label={ 'Source' }
				options={ dataSources }
				value={ getValue(
					'data_source',
					attr,
					attributes
				) }
				onChange={ newValue => {
					setValue(
						newValue,
						'data_source',
						attr,
						attributes,
						setAttributes,
						supports
					);
				}}
			/>
			{ 'object' === getValue( 'data_source', attr, attributes ) &&
				<GroupedSelectControl
					label={ 'Propery' }
					value={ getValue(
						'property',
						attr,
						attributes
					) }
					options={ objectFields }
					onChange={ newValue => {
						setValue(
							newValue,
							'property',
							attr,
							attributes,
							setAttributes,
							supports
						);
					}}
				/>
			}
			{ 'custom' === getValue( 'data_source', attr, attributes ) &&
				<MacrosControl
					getValue={ getValue }
					setValue={ setValue }
					attr={ attr }
					attributes={ attributes }
					setAttributes={ setAttributes }
					supports={ supports }
				/>
			}
		</Fragment>;
	}
}

window.JetEngineBlocksComponents = window.JetEngineBlocksComponents || {};
window.JetEngineBlocksComponents.DataSourceControls = withFilters( 'jetEngine.dynamic.dataSourceControls' )( DataSourceControls );

export default withFilters( 'jetEngine.dynamic.dataSourceControls' )( DataSourceControls );
