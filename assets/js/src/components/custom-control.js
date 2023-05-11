import GroupedSelectControl from "components/grouped-select-control.js";

const {
	SelectControl,
	ToggleControl,
	TextControl,
	TextareaControl
} = wp.components;

const {
	Component,
	Fragment
} = wp.element;

class CustomControl extends Component {

	isEnabled() {

		if ( ! this.props.condition ) {
			return true;
		}

		for ( var field in this.props.condition ) {

			var compare        = this.props.condition[ field ];
			var checked        = true;
			var isNotEqualCond = field.includes( '!' );

			if ( isNotEqualCond ) {
				field = field.replace( '!', '' );
			}

			if ( this.props.prefix ) {
				field = this.props.prefix + field;
			}

			var fieldVal = this.props.getValue( field, this.props.attr, this.props.attributes );

			if ( isNotEqualCond ) {
				if ( Array.isArray( compare ) ) {
					checked = ! compare.includes( fieldVal );
				} else {
					checked = fieldVal != compare;
				}
			} else {
				if ( Array.isArray( compare ) ) {
					checked = compare.includes( fieldVal );
				} else {
					checked = fieldVal == compare;
				}
			}

			if ( ! checked ) {
				return false;
			}

		}

		return true;
	}

	htmlDesc( htmlDescription ) {
		return ( htmlDescription && <p
			className="components-base-control__help"
			style={ {
			    fontSize: '12px',
				fontStyle: 'normal',
				color: 'rgb(117, 117, 117)',
				margin: '-7px 0 20px',
			} }
			dangerouslySetInnerHTML={{ __html: htmlDescription }}
		></p> );
	}

	render() {

		const {
			control,
			value,
			onChange,
			children
		} = this.props;

		if ( ! this.isEnabled() ) {
			return null;
		}

		let htmlDescription = ( control.has_html && control.description ) ? control.description : '';
		let description     = ( ! htmlDescription && control.description  ) ? control.description : '';

		switch ( control.type ) {

			case 'select':
			case 'select2':

				let options = [];

				if ( control.options && control.options.length ) {
					
					options = [ ...control.options ];

					if ( control.placeholder ) {
						options.unshift( {
							value: '',
							label: control.placeholder,
						} );
					}

				}

				if ( control.groups ) {
					return <Fragment>
						{ children }
						<GroupedSelectControl
							label={ control.label }
							help={ description }
							options={ control.groups }
							value={ value }
							onChange={ newValue => {
								onChange( newValue );
							} }
						/>
						{ this.htmlDesc( htmlDescription ) }
					</Fragment>;
				} else {
					return <Fragment>
						{ children }
						<SelectControl
							label={ control.label }
							help={ description }
							options={ options }
							value={ value }
							onChange={ newValue => {
								onChange( newValue );
							} }
						/>
						{ this.htmlDesc( htmlDescription ) }
					</Fragment>;
				}

			case 'textarea':
				return <Fragment>
					{ children }
					<TextareaControl
						label={ control.label }
						help={ description }
						value={ value }
						onChange={ newValue => {
							onChange( newValue );
						} }
					/>
					{ this.htmlDesc( htmlDescription ) }
				</Fragment>;

			case 'switcher':
				return <Fragment>
					{ children }
					<ToggleControl
						label={ control.label }
						help={ description }
						checked={ value }
						onChange={ () => {
							onChange( !value );
						} }
					/>
					{ this.htmlDesc( htmlDescription ) }
				</Fragment>;

			case 'number':
				return <Fragment>
					{ children }
					<TextControl
						type="number"
						label={ control.label }
						help={ description }
						min={ control.min ? control.min : 1 }
						max={ control.max ? control.max : 100 }
						step={ control.step ? control.step : 1 }
						value={ value }
						onChange={ newValue => {
							onChange( Number( newValue ) );
						} }
					/>
					{ this.htmlDesc( htmlDescription ) }
				</Fragment>;

			case 'raw_html':
				return <Fragment>
					{ children }
					<p
						dangerouslySetInnerHTML={{ __html: control.raw }}
					></p>
				</Fragment>;

			default:
				return <Fragment>
					{ children }
					<TextControl
						type="text"
						label={ control.label }
						help={ description }
						value={ value }
						onChange={ newValue => {
							onChange( newValue );
						} }
					/>
					{ this.htmlDesc( htmlDescription ) }
				</Fragment>;
		}
	}
}

window.JetEngineBlocksComponents = window.JetEngineBlocksComponents || {};
window.JetEngineBlocksComponents.CustomControl = CustomControl;

export default CustomControl;
