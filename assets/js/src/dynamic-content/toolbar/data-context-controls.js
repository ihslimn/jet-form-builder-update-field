const {
	TextControl,
	SelectControl,
	withFilters
} = wp.components;

const {
	Fragment
} = wp.element;

class DataContextControls extends wp.element.Component {

	render() {

		const {
			getValue,
			attr,
			attributes,
			setAttributes,
			setValue,
			supports
		} = this.props;

		const allowedContextList = window.JetEngineListingData.allowedContextList;

		return <Fragment>
			<SelectControl
				label={ 'Context' }
				options={ allowedContextList }
				value={ getValue(
					'object_context',
					attr,
					attributes
				) }
				onChange={ newValue => {
					setValue(
						newValue,
						'object_context',
						attr,
						attributes,
						setAttributes,
						supports
					);
				}}
			/>
		</Fragment>;
	}
}

window.JetEngineBlocksComponents = window.JetEngineBlocksComponents || {};
window.JetEngineBlocksComponents.DataContextControls = withFilters( 'jetEngine.dynamic.dataContextControls' )( DataContextControls );

export default withFilters( 'jetEngine.dynamic.dataContextControls' )( DataContextControls );
