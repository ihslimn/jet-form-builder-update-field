import GroupedSelectControl from "components/grouped-select-control.js";
import CustomControl from "components/custom-control.js";

const {
	SelectControl,
	ToggleControl,
	TextControl,
	TextareaControl
} = wp.components;

class DynamicCustomControl extends wp.element.Component {

	render() {

		const {
			getValue,
			attr,
			attributes,
			setAttributes,
			setValue,
			supports,
			control,
			prefix,
			condition
		} = this.props;

		var controlName = control.name;

		if ( prefix ) {
			controlName = prefix + controlName;
		}

		return <CustomControl
			control={ control }
			value={ getValue( controlName, attr, attributes ) }
			attr={ attr }
			attributes={ attributes }
			getValue={ getValue }
			prefix={ prefix }
			condition={ condition }
			onChange={ newValue => {
				setValue( newValue, controlName, attr, attributes, setAttributes, supports );
			} }
		/>
	}
}

export default DynamicCustomControl;
