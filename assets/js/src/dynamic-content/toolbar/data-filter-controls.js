import DynamicCustomControl from "./dynamic-custom-control";
import { getCallbackArgs } from "utils/utility.js";

const {
	TextControl,
	SelectControl,
	ToggleControl,
	withFilters
} = wp.components;

const {
	Fragment
} = wp.element;

class DataFilterControls extends wp.element.Component {

	render() {

		const {
			getValue,
			attr,
			attributes,
			setAttributes,
			setValue,
			supports
		} = this.props;

		const filterCallbacks = window.JetEngineListingData.filterCallbacks;

		return <Fragment>
			<br/>
			<ToggleControl
				label={ 'Filter output' }
				checked={ getValue(
					'filter_output',
					attr,
					attributes
				) }
				onChange={ () => {
					setValue(
						! getValue( 'filter_output', attr, attributes ),
						'filter_output',
						attr,
						attributes,
						setAttributes,
						supports
					);
				} }
			/>
			{ getValue( 'filter_output', attr, attributes ) &&
				<SelectControl
					label={ 'Callback' }
					value={ getValue(
						'filter_callback',
						attr,
						attributes
					) }
					options={ filterCallbacks }
					onChange={ ( newValue ) => {
						setValue(
							newValue,
							'filter_callback',
							attr,
							attributes,
							setAttributes,
							supports
						);
					} }
				/>
			}
			{ getValue( 'filter_output', attr, attributes ) && getValue( 'filter_callback', attr, attributes ) && getCallbackArgs( getValue( 'filter_callback', attr, attributes ) ).map( ( control ) => {
				return <DynamicCustomControl
					getValue={ getValue }
					setValue={ setValue }
					attr={ attr }
					attributes={ attributes }
					setAttributes={ setAttributes }
					supports={ supports }
					control={ control }
					key={ 'filter_callback_control_' + control.name }
				/>
			} ) }
		</Fragment>;
	}
}

export default withFilters( 'jetEngine.dynamic.dataFilterControls' )( DataFilterControls );
