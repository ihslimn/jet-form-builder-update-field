import DynamicCustomControl from "./dynamic-custom-control";

const {
	Fragment
} = wp.element;

const DynamicFunctions = function( DataSourceControls ) {

	return ( props ) => {

		const {
			getValue,
			attr,
			attributes,
			setAttributes,
			setValue,
			supports
		} = props;

		const controls = window.JetEngineListingData.dynamicFunctionsControls || [];

		return (
			<Fragment>
				<DataSourceControls { ...props } />
				{ 'dynamic_function' === getValue( 'data_source', attr, attributes ) &&
					controls.map( ( control ) => {
						return <DynamicCustomControl
							getValue={ getValue }
							setValue={ setValue }
							attr={ attr }
							attributes={ attributes }
							setAttributes={ setAttributes }
							supports={ supports }
							control={ control }
							prefix={ 'dynamic_functions_' }
							condition={ control.condition }
							key={ 'dynamic_functions_control_' + control.name }
						/>
					} )
				}
			</Fragment>
		);
	};
}

export default DynamicFunctions;
