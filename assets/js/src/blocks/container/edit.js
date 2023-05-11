import BlockBody from './block-body';
import IconVertical from 'icons/vertical';
import IconHorizontal from 'icons/horizontal';
import IconHorizontalStart from 'icons/horizontal-start';
import IconHorizontalEnd from 'icons/horizontal-end';
import IconHorizontalCenter from 'icons/horizontal-center';
import IconHorizontalBetween from 'icons/horizontal-between';
import IconHorizontalJustify from 'icons/horizontal-justify';
import IconVerticalTop from 'icons/vertical-top';
import IconVerticalMiddle from 'icons/vertical-middle';
import IconVerticalBottom from 'icons/vertical-bottom';
import IconLink from 'icons/link';
import IconLinkOff from 'icons/link-off';

import {
	getGradientValueBySlug,
	getGradientSlugByValue,
	getColorObjectByColorValue,
	getColorObjectByAttributeValues
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
	__experimentalLinkControl,
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

	const directions = [
		{
			name: 'vertical',
			title: __( 'Vertical' ),
			icon: IconVertical,
			onClick: () => setDirection( 'vertical' ),
			isActive: ( attributes.content_direction === 'vertical' )
		},
		{
			name: 'horizontal',
			title: __( 'Horizontal' ),
			icon: IconHorizontal,
			onClick: () => setDirection( 'horizontal' ),
			isActive: ( attributes.content_direction === 'horizontal' )
		}
	];

	const hAlignments = [
		{
			name: 'flex-start',
			title: __( 'Start' ),
			icon: IconHorizontalStart,
			onClick: () => setHAlignment( 'flex-start' ),
			isActive: ( attributes.content_h_alignment === 'flex-start' )
		},
		{
			name: 'center',
			title: __( 'Center' ),
			icon: IconHorizontalCenter,
			onClick: () => setHAlignment( 'center' ),
			isActive: ( attributes.content_h_alignment === 'center' )
		},
		{
			name: 'flex-end',
			title: __( 'End' ),
			icon: IconHorizontalEnd,
			onClick: () => setHAlignment( 'flex-end' ),
			isActive: ( attributes.content_h_alignment === 'flex-end' )
		},
		{
			name: 'space-between',
			title: __( 'Space Between' ),
			icon: IconHorizontalBetween,
			onClick: () => setHAlignment( 'space-between' ),
			isActive: ( attributes.content_h_alignment === 'space-between' )
		},
		{
			name: 'stretch',
			title: __( 'Stretch' ),
			icon: IconHorizontalJustify,
			onClick: () => setHAlignment( 'stretch' ),
			isActive: ( attributes.content_h_alignment === 'stretch' )
		}
	];

	const vAlignments = [
		{
			name: 'flex-start',
			title: __( 'Start' ),
			icon: IconVerticalTop,
			onClick: () => setVAlignment( 'flex-start' ),
			isActive: ( attributes.content_v_alignment === 'flex-start' )
		},
		{
			name: 'center',
			title: __( 'Center' ),
			icon: IconVerticalMiddle,
			onClick: () => setVAlignment( 'center' ),
			isActive: ( attributes.content_v_alignment === 'center' )
		},
		{
			name: 'flex-end',
			title: __( 'End' ),
			icon: IconVerticalBottom,
			onClick: () => setVAlignment( 'flex-end' ),
			isActive: ( attributes.content_v_alignment === 'flex-end' )
		},
	];

	const setDirection = function( value ) {
		setAttributes( {
			content_direction: value
		} );
	}

	const setHAlignment = function( value ) {
		setAttributes( {
			content_h_alignment: value
		} );
	}

	const setVAlignment = function( value ) {
		setAttributes( {
			content_v_alignment: value
		} );
	}

	const getItemIcon = function( value, items ) {

		for ( var i = 0; i < items.length; i++ ) {
			if ( value === items[ i ].name ) {
				return items[ i ].icon;
			}
		}

		return null;
	}

	const heightOptions = [
		{
			value: 'auto',
			label: __( 'Auto' ),
		},
		{
			value: 'fixed',
			label: __( 'Fixed value' ),
		},
		{
			value: 'fit_to_screen',
			label: __( 'Fit to screen' ),
		},
	];

	const widthOptions = [
		{
			value: 'fullwidth',
			label: __( 'Fullwidth' ),
		},
		{
			value: 'fixed',
			label: __( 'Fixed value' ),
		},
	];

	const ALLOWED_MEDIA_TYPES = [ 'image/*' ];

	const getHeightHelpText = function() {
		switch ( attributes.height ) {
			case 'auto':
				return __( 'Stretch container by inner content height' );
			case 'fixed':
				return __( 'Set container height manually' );
			case 'fit_to_screen':
				return __( 'Stretch container height by window height' );
		}
	}

	const getWidthHelpText = function() {
		switch ( attributes.width ) {
			case 'auto':
				return __( 'Stretch container by inner content width' );
			case 'fixed':
				return __( 'Set container width manually' );
			case 'fullwidth':
				return __( 'Stretch container width by parent width' );
		}
	}

	const EMPTY_ARRAY = [];
	const colors = useSetting( 'color.palette' ) || EMPTY_ARRAY;
	const gradients = useSetting( 'color.gradients' ) || EMPTY_ARRAY;
	const colorValue = getColorObjectByAttributeValues( colors, attributes.background_color, attributes.custom_background_color ).color;
	const gradientValue = attributes.custom_background_gradient || getGradientValueBySlug( gradients, attributes.background_gradient );

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
						background_gradient: '',
						custom_background_gradient: '',
						background_color: colorObject.slug,
						custom_background_color: '',
					});
				} else {
					setAttributes({
						background_gradient: '',
						custom_background_gradient: '',
						background_color: '',
						custom_background_color: value,
					});
				}
			},
			colorValue: colorValue,
			gradientValue: gradientValue,
			onGradientChange: function( value ) {

				if ( ! value ) {
					return;
				}
				const slug = getGradientSlugByValue( gradients, value );

				if ( slug ) {
					setAttributes({
						background_gradient: slug,
						custom_background_gradient: '',
						background_color: '',
						custom_background_color: '',
					});
				} else {
					setAttributes({
						background_gradient: '',
						custom_background_gradient: value,
						background_color: '',
						custom_background_color: '',
					});
				}
			}
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
			<BlockControls
				key={ className + '-toolbar' }
			>
				<ToolbarGroup>
					<DropdownMenu
						icon={ getItemIcon( attributes.content_direction, directions ) }
						label={ __( 'Content Direction' ) }
						controls={ directions }
					/>
					<DropdownMenu
						icon={ getItemIcon( attributes.content_h_alignment, hAlignments ) }
						label={ __( 'Horizontal Alignment' ) }
						controls={ hAlignments }
					/>
					<DropdownMenu
						icon={ getItemIcon( attributes.content_v_alignment, vAlignments ) }
						label={ __( 'Vertical Alignment' ) }
						controls={ vAlignments }
					/>
				</ToolbarGroup>
				<ToolbarGroup>
				{ ! attributes.section_url && (
					<ToolbarButton
						name="link"
						icon={ IconLink }
						title={ __( 'Link' ) }
						onClick={ ( event ) => {
							event.preventDefault();
							setIsEditingURL( true );
						} }
					/>
				) }
				{ attributes.section_url && (
					<ToolbarButton
						name="link"
						icon={ IconLinkOff }
						title={ __( 'Unlink' ) }
						onClick={ () => {

							setAttributes( {
								section_url: undefined,
								section_url_target: undefined
							} );

							setIsEditingURL( false );

						} }
						isActive={ true }
					/>
				) }
				</ToolbarGroup>
			</BlockControls>
			{ props.isSelected && ! isSelectingMedia && ( isEditingURL || attributes.section_url ) && (
				<Popover
					position="top right"
					onClose={ () => {
						setIsEditingURL( false );
					} }
					focusOnMount={ isEditingURL ? 'firstElement' : false }
				>
					<__experimentalLinkControl
						className="wp-block-navigation-link__inline-link-input"
						value={ {
							url: attributes.section_url,
							opensInNewTab: attributes.section_url_target
						} }
						onChange={ ( newData ) => {

							setAttributes( { section_url: newData.url } );

							if ( attributes.section_url_target !== newData.opensInNewTab ) {
								setAttributes( { section_url_target: newData.opensInNewTab } );
							}
						} }
						onRemove={ () => {

							setAttributes( {
								section_url: undefined,
								section_url_target: undefined
							} );

							setIsEditingURL( false );

						} }
						forceIsEditingLink={ isEditingURL }
					/>
				</Popover>
			) }
			<InspectorControls
				key={ className + '-inspector' }
			>
				<PanelBody
					title={ __( 'General', 'jet-engine' ) }
				>
					<SelectControl
						label={ __( 'Height' ) }
						help={ getHeightHelpText() }
						value={ attributes.height }
						options={ heightOptions }
						onChange={ newValue => {
							setAttributes({
								height: newValue,
							});
						} }
					/>
					{ 'auto' === attributes.height && <Fragment>
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
							label={ __( 'Min Height' ) }
							value={ attributes.min_height }
							onChange={ newValue => {
								setAttributes({
									min_height: newValue,
								});
							} }
						/>
						<br/>
					</Fragment> }
					{ 'fixed' === attributes.height && <Fragment>
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
							label={ __( 'Height' ) }
							value={ attributes.fixed_height }
							onChange={ newValue => {
								setAttributes({
									fixed_height: newValue,
								});
							} }
						/>
						<br/>
					</Fragment> }
					<SelectControl
						label={ __( 'Width' ) }
						help={ getWidthHelpText() }
						value={ attributes.width }
						options={ widthOptions }
						onChange={ newValue => {
							setAttributes({
								width: newValue,
							});
						} }
					/>
					{ 'fixed' === attributes.width && <Fragment>
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
							value={ attributes.fixed_width }
							onChange={ newValue => {
								setAttributes({
									fixed_width: newValue,
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
					title={ __( 'Bacground Color/Overlay' ) }
					initialOpen={ false }
					settings={ backgroundOverlaySettings }
				>
					<RangeControl
						label={ __( 'Overlay opacity' ) }
						value={ attributes.background_overlay_opacity }
						onChange={ ( value ) => {
							setAttributes( {
								background_overlay_opacity: value,
							} )
						} }
						min={ 0 }
						max={ 1 }
						step={ 0.1 }
					/>
				</__experimentalPanelColorGradientSettings>
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
