import {
	clone
} from '../../utils/utility';

const { __ } = wp.i18n;
const {
	registerBlockType
} = wp.blocks;

const {
	InspectorControls,
	MediaUpload
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

if ( -1 !== window.JetEngineListingData.activeModules.indexOf( 'booking-forms' ) ) {
	const GIcon = <SVG width="20" height="24" viewBox="0 0 46 55" fill="none" xmlns="http://www.w3.org/2000/svg"><Path fillRule="evenodd" clipRule="evenodd" d="M10 41C7.79086 41 6 42.7909 6 45C6 47.2091 7.79086 49 10 49H21C23.2091 49 25 47.2091 25 45C25 42.7909 23.2091 41 21 41H10ZM21 43H10C8.89543 43 8 43.8954 8 45C8 46.1046 8.89543 47 10 47H21C22.1046 47 23 46.1046 23 45C23 43.8954 22.1046 43 21 43Z" fill="currentColor"/><Path fillRule="evenodd" clipRule="evenodd" d="M6 30C6 28.8954 6.89543 28 8 28H38C39.1046 28 40 28.8954 40 30V34C40 35.1046 39.1046 36 38 36H8C6.89543 36 6 35.1046 6 34V30ZM8 30H38V34H8V30Z" fill="currentColor"/><Path fillRule="evenodd" clipRule="evenodd" d="M8 18C6.89543 18 6 18.8954 6 20V24C6 25.1046 6.89543 26 8 26H38C39.1046 26 40 25.1046 40 24V20C40 18.8954 39.1046 18 38 18H8ZM38 20H8V24H38V20Z" fill="currentColor"/><Path d="M6 11C6 10.4477 6.44772 10 7 10H24C24.5523 10 25 10.4477 25 11C25 11.5523 24.5523 12 24 12H7C6.44771 12 6 11.5523 6 11Z" fill="currentColor"/><Path fillRule="evenodd" clipRule="evenodd" d="M4 0C1.79086 0 0 1.79086 0 4V51C0 53.2091 1.79086 55 4 55H42C44.2091 55 46 53.2091 46 51V4C46 1.79086 44.2091 0 42 0H4ZM42 2H4C2.89543 2 2 2.89543 2 4V51C2 52.1046 2.89543 53 4 53H42C43.1046 53 44 52.1046 44 51V4C44 2.89543 43.1046 2 42 2Z" fill="currentColor"/></SVG>;
	
	const blockAttributes = window.JetEngineListingData.atts.bookingForm;

	registerBlockType( 'jet-engine/booking-form', {
		title: __( 'Form' ),
		icon: GIcon,
		category: 'jet-engine',
		attributes: blockAttributes,
		className: 'jet-form',
		edit: class extends wp.element.Component {
			render() {

				const props         = this.props;
				const attributes    = props.attributes;
				const formsOptions  = window.JetEngineListingData.formsOptions;

				return [
					props.isSelected && (
						<InspectorControls
							key={ 'inspector' }
						>
							<PanelBody title={ __( 'General' ) }>
								<SelectControl
									label={ __( 'Select form' ) }
									value={ attributes._form_id }
									options={ formsOptions }
									onChange={ newValue => {
										props.setAttributes( { _form_id: newValue } );
									} }
								/>
								<SelectControl
									label={ __( 'Fields layout' ) }
									value={ attributes.fields_layout }
									options={ [
										{
											value: 'column',
											label: __( 'Column' ),
										},
										{
											value: 'row',
											label: __( 'Row' ),
										},
									] }
									onChange={ newValue => {
										props.setAttributes( { fields_layout: newValue } );
									} }
								/>
								<SelectControl
									label={ __( 'Fields label HTML tag' ) }
									value={ attributes.fields_label_tag }
									options={ [
										{
											value: 'div',
											label: __( 'DIV' ),
										},
										{
											value: 'label',
											label: __( 'LABEL' ),
										},
									] }
									onChange={ newValue => {
										props.setAttributes( { fields_label_tag: newValue } );
									} }
								/>
								<SelectControl
									label={ __( 'Submit type' ) }
									value={ attributes.submit_type }
									options={ [
										{
											value: 'reload',
											label: __( 'Reload' ),
										},
										{
											value: 'ajax',
											label: __( 'AJAX' ),
										},
									] }
									onChange={ newValue => {
										props.setAttributes( { submit_type: newValue } );
									} }
								/>
								<ToggleControl
									label={ __( 'Cache form output' ) }
									checked={ attributes.cache_form }
									onChange={ () => {
										props.setAttributes( { cache_form: ! attributes.cache_form } );
									} }
								/>
								<hr/>
								<ToggleControl
									label={ __( 'Divider between rows' ) }
									checked={ attributes.rows_divider }
									onChange={ () => {
										props.setAttributes( { rows_divider: ! attributes.rows_divider } );
									} }
								/>
								<TextControl
									type="text"
									label={ __( 'Required mark' ) }
									value={ attributes.required_mark }
									onChange={ newValue => {
										props.setAttributes( { required_mark: newValue } );
									} }
								/>
							</PanelBody>
						</InspectorControls>
					),
					<Disabled key={ 'block_render' }>
						<ServerSideRender
							block="jet-engine/booking-form"
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
