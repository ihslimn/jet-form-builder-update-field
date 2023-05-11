import DynamicCustomControl from "./dynamic-custom-control";

const {
	TextControl,
	SelectControl
} = wp.components;

const {
	Fragment
} = wp.element;

const macrosOptions = function( macrosList ) {

	const result = [ {
		value: '',
		label: 'Select...',
	} ];

	if ( ! macrosList ) {
		return result;
	}

	Object.keys( macrosList ).map( ( key ) => {
		result.push( {
			value: key,
			label: macrosList[ key ].label,
		} );
	} );

	return result;

}

const convertOptionsList = function( optionsList, result ) {

	if ( ! optionsList ) {
		return;
	}

	if ( Array.isArray( optionsList ) ) {

		for ( var i = 0; i < optionsList.length; i++) {
			result.push( optionsList[ i ] );
		}

		return;
	}

	Object.keys( optionsList ).map( ( optionKey ) => {
		result.push( {
			value: optionKey,
			label: optionsList[ optionKey ],
		} );
	} );
}

class MacrosControl extends wp.element.Component {

	render() {

		const {
			getValue,
			attr,
			attributes,
			setAttributes,
			setValue,
			supports
		} = this.props;

		const macrosList = window.JetEngineListingData.macrosList;

		return <Fragment>
			<SelectControl
				label={ 'Select data to show' }
				options={ macrosOptions( macrosList ) }
				value={ getValue(
					'macros',
					attr,
					attributes
				) }
				onChange={ newValue => {
					setValue(
						newValue,
						'macros',
						attr,
						attributes,
						setAttributes,
						supports
					);
				}}
			/>
			{ macrosList[ getValue( 'macros', attr, attributes ) ] && macrosList[ getValue( 'macros', attr, attributes ) ].args && Object.keys( macrosList[ getValue( 'macros', attr, attributes ) ].args ).map( ( key ) => {

				const control = macrosList[ getValue( 'macros', attr, attributes ) ].args[ key ];
				const controlOptions = [];

				control.name = key;

				if ( control.groups ) {
					for ( var i = 0; i < control.groups.length; i++ ) {

						let children = [];
						let options  = control.groups[ i ].options || control.groups[ i ].values || [];

						convertOptionsList( options, children );

						controlOptions.push( {
							label: control.groups[ i ].label,
							values: children,
						} );

					}

					control.groups = controlOptions;

				} else if ( control.options ) {
					convertOptionsList( control.options, controlOptions );
					control.options = controlOptions;
				}

				return <DynamicCustomControl
					getValue={ getValue }
					setValue={ setValue }
					attr={ attr }
					attributes={ attributes }
					setAttributes={ setAttributes }
					supports={ supports }
					control={ control }
				/>

			} ) }
		</Fragment>;
	}
}

export default MacrosControl;
