import BlockBody from './block-body';
import {
	getColorObjectByAttributeValues,
	getColorObjectByColorValue
} from 'utils/utility';

const { __ } = wp.i18n;

const {
	Button,
	RangeControl,
	ToggleControl,
	ToolbarGroup,
	ToolbarButton,
	Popover,
	DropdownMenu,
	PanelBody,
	SelectControl
} = wp.components;

const {
	assign
} = lodash;

/**
 * Experimatal controls.
 * @todo Should be replaced when become stable
 */
const UnitControl = wp.components.__experimentalUnitControl;

const {
	BlockControls,
	useBlockProps,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	ColorPalette,
	useSetting,
	__experimentalPanelColorGradientSettings,
} = wp.blockEditor;

const {
	Fragment,
	useState
} = wp.element;

const Edit = function( props ) {

	const blockProps = useBlockProps();

	const [ isEditingURL, setIsEditingURL ] = useState( false );
	const [ isSelectingMedia, setIsSelectingMedia ] = useState( false );

	const {
		className,
		attributes,
		setAttributes,
	} = props;

	const layoutOptions = [
		{
			value: 'fullwidth',
			label: __( 'Fullwidth content' ),
		},
		{
			value: 'boxed',
			label: __( 'Boxed content' ),
		},
	];

	const ALLOWED_MEDIA_TYPES = [ 'image/*' ];

	const getHelpText = function() {
		switch ( attributes.layout ) {
			case 'fullwidth':
				return __( 'Stretch section content by section width' );
			case 'boxed':
				return __( 'Limit section content by fixed width' );
		}
	}

	const EMPTY_ARRAY = [];
	const colors = useSetting( 'color.palette' ) || EMPTY_ARRAY;
	const colorValue = getColorObjectByAttributeValues( colors, attributes.background_color, attributes.custom_background_color ).color;

	const backgroundOverlaySettings = [
		{
			label: __( 'Color' ),
			onColorChange: function( value ) {
				// do nothing for falsy values
				if ( ! value ) {
					return;
				}

				const colorObject = getColorObjectByColorValue( colors, value );

				if ( colorObject && colorObject.slug ) {
					setAttributes({
						background_color: colorObject.slug,
						custom_background_color: '',
					});
				} else {
					setAttributes({
						background_color: '',
						custom_background_color: value,
					});
				}
			},
			colorValue: colorValue,
		}
	]

	const backgroundPostions = [
		{
			value: 'top left',
			label: __( 'Top left' ),
		},
		{
			value: 'top center',
			label: __( 'Top center' ),
		},
		{
			value: 'top right',
			label: __( 'Top right' ),
		},
		{
			value: 'center left',
			label: __( 'Center left' ),
		},
		{
			value: 'center',
			label: __( 'Center' ),
		},
		{
			value: 'center right',
			label: __( 'Center right' ),
		},
		{
			value: 'bottom left',
			label: __( 'Bottom left' ),
		},
		{
			value: 'bottom center',
			label: __( 'Bottom center' ),
		},
		{
			value: 'bottom right',
			label: __( 'Bottom right' ),
		},
	];

	const backgroundRepeats = [
		{
			value: 'repeat',
			label: __( 'Repeat' ),
		},
		{
			value: 'no-repeat',
			label: __( 'No repeat' ),
		},
		{
			value: 'repeat-x',
			label: __( 'Repeat horizontally' ),
		},
		{
			value: 'repeat-y',
			label: __( 'Repeat vertically' ),
		},
	];

	const backgroundSizes = [
		{
			value: 'auto',
			label: __( 'Auto' ),
		},
		{
			value: 'contain',
			label: __( 'Contain' ),
		},
		{
			value: 'cover',
			label: __( 'Cover' ),
		},
	];

	return (
		<Fragment>
			<InspectorControls
				key={ className + '-inspector' }
			>
				<PanelBody
					title={ __( 'General', 'jet-engine' ) }
				>
					<SelectControl
						label={ __( 'Layout' ) }
						help={ getHelpText() }
						value={ attributes.layout }
						options={ layoutOptions }
						onChange={ newValue => {
							setAttributes({
								layout: newValue,
							});
						} }
					/>
					{ 'boxed' === attributes.layout && <Fragment>
						<UnitControl
							units={ [
								{
									value: 'px',
									label: 'px',
								},
								{
									value: '%',
									label: '%',
								},
								{
									value: 'vh',
									label: 'vh',
								},
							] }
							label={ __( 'Width' ) }
							value={ attributes.content_width }
							onChange={ newValue => {
								setAttributes({
									content_width: newValue,
								});
							} }
						/><br/>
					</Fragment> }
				</PanelBody>
				<PanelBody
					title={ __( 'Background Image', 'jet-engine' ) }
				>
					<MediaUploadCheck>
						{ attributes.background_image_url && <img
							src={ attributes.background_image_url }
						/>
						}
						<MediaUpload
							onSelect={ ( media ) => {
								setAttributes( {
									background_image_url: media.url,
									background_image_id: media.id,
								} )
							} }
							allowedTypes={ ALLOWED_MEDIA_TYPES }
							value={ attributes.background_image }
							render={ ( { open } ) => (
								<div>
									<br/>
									<div style={ {
										display: 'flex',
										justifyContent: 'space-between',
									} }>
										<Button
											onClick={ () => {
												setIsSelectingMedia( true );
												open();
											} }
											isSecondary={ true }
										>{ __( 'Select or upload image' ) }</Button>
										{ attributes.background_image_url && <Button
											onClick={ () => {
												setAttributes( {
													background_image_url: null,
													background_image_id: 0,
												} );
											} }
											isDestructive={ true }
										>{ __( 'Reset' ) }</Button> }
									</div>
								</div>
							) }
						/>
					</MediaUploadCheck>
					{ ( attributes.background_image_url || attributes.background_image_id ) && <Fragment>
						<br/>
						<SelectControl
							label={ __( 'Inserted Image Size' ) }
							help={ __( 'Defines actual size of the image' ) }
							value={ attributes.background_settings.image_size }
							options={ window.JetEngineListingData.imageSizes }
							onChange={ ( newValue ) => {
								setAttributes({
									background_settings: assign(
										{},
										attributes.background_settings,
										{ image_size: newValue }
									)
								});
							}}
						/>
						<SelectControl
							label={ __( 'Background Position' ) }
							value={ attributes.background_settings.background_position }
							options={ backgroundPostions }
							onChange={ ( newValue ) => {
								setAttributes({
									background_settings: assign(
										{},
										attributes.background_settings,
										{ background_position: newValue }
									)
								});
							}}
						/>
						<SelectControl
							label={ __( 'Background Repeat' ) }
							value={ attributes.background_settings.background_repeat }
							options={ backgroundRepeats }
							onChange={ ( newValue ) => {
								setAttributes({
									background_settings: assign(
										{},
										attributes.background_settings,
										{ background_repeat: newValue }
									)
								});
							}}
						/>
						<SelectControl
							label={ __( 'Background Size' ) }
							value={ attributes.background_settings.background_size }
							help={ __( 'Defines size of the image related to the container' ) }
							options={ backgroundSizes }
							onChange={ ( newValue ) => {
								setAttributes({
									background_settings: assign(
										{},
										attributes.background_settings,
										{ background_size: newValue }
									)
								});
							}}
						/>
					</Fragment>}
				</PanelBody>
				<__experimentalPanelColorGradientSettings
					title={ __( 'Bacground Color' ) }
					initialOpen={ false }
					disableCustomGradients={ true }
					settings={ backgroundOverlaySettings }
				></__experimentalPanelColorGradientSettings>
			</InspectorControls>
			<BlockBody
				attributes={ attributes }
				blockProps={ blockProps }
				isEdit={ true }
				className={ className }
			/>
		</Fragment>
	);
}

export default Edit;
