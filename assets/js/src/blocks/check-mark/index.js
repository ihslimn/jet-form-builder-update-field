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
	Button,
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
	const GIcon = <SVG width="38" height="24" viewBox="0 0 64 41" fill="none" xmlns="http://www.w3.org/2000/svg"><Path d="M13.6402 5.2318C14.0645 5.58537 14.1218 6.21593 13.7682 6.64021L8.76822 12.6402C8.58836 12.856 8.32599 12.9863 8.04531 12.999C7.76464 13.0117 7.49156 12.9058 7.29289 12.7071L4.29289 9.70713C3.90237 9.31661 3.90237 8.68344 4.29289 8.29292C4.68342 7.90239 5.31658 7.90239 5.70711 8.29292L7.9328 10.5186L12.2318 5.35984C12.5853 4.93556 13.2159 4.87824 13.6402 5.2318Z" fill="currentColor"/><Path fillRule="evenodd" clipRule="evenodd" d="M4 0C1.79086 0 0 1.79086 0 4V14C0 16.2091 1.79086 18 4 18H14C16.2091 18 18 16.2091 18 14V4C18 1.79086 16.2091 0 14 0H4ZM14 2H4C2.89543 2 2 2.89543 2 4V14C2 15.1046 2.89543 16 4 16H14C15.1046 16 16 15.1046 16 14V4C16 2.89543 15.1046 2 14 2Z" fill="currentColor"/><Path d="M23 6C22.4477 6 22 6.44772 22 7C22 7.55228 22.4477 8 23 8H63C63.5523 8 64 7.55228 64 7C64 6.44772 63.5523 6 63 6H23Z" fill="currentColor"/><Path d="M23 10C22.4477 10 22 10.4477 22 11C22 11.5523 22.4477 12 23 12H42C42.5523 12 43 11.5523 43 11C43 10.4477 42.5523 10 42 10H23Z" fill="currentColor"/><Path fillRule="evenodd" clipRule="evenodd" d="M0 27C0 24.7909 1.79086 23 4 23H14C16.2091 23 18 24.7909 18 27V37C18 39.2091 16.2091 41 14 41H4C1.79086 41 0 39.2091 0 37V27ZM4 25H14C15.1046 25 16 25.8954 16 27V37C16 38.1046 15.1046 39 14 39H4C2.89543 39 2 38.1046 2 37V27C2 25.8954 2.89543 25 4 25Z" fill="currentColor"/><Path d="M22 30C22 29.4477 22.4477 29 23 29H63C63.5523 29 64 29.4477 64 30C64 30.5523 63.5523 31 63 31H23C22.4477 31 22 30.5523 22 30Z" fill="currentColor"/><Path d="M23 33C22.4477 33 22 33.4477 22 34C22 34.5523 22.4477 35 23 35H42C42.5523 35 43 34.5523 43 34C43 33.4477 42.5523 33 42 33H23Z" fill="currentColor"/></SVG>;

	const blockAttributes = window.JetEngineListingData.atts.checkMark;

	registerBlockType( 'jet-engine/check-mark', {
		title: __( 'Check Mark' ),
		icon: GIcon,
		category: 'jet-engine',
		attributes: blockAttributes,
		className: 'jet-form__check-mark',
		edit: class extends wp.element.Component {
			render() {

				const props      = this.props;
				const attributes = props.attributes;

				return [
					props.isSelected && (
						<InspectorControls
							key={ 'inspector' }
						>
							<PanelBody title={ __( 'General' ) }>
								<div className="jet-media-control components-base-control">
									<div className="components-base-control__label">{ __( 'Default Icon' ) }</div>
									{ attributes.check_mark_icon_default_url && <img src={ attributes.check_mark_icon_default_url } width="100%" height="auto"/> }
									<MediaUpload
										onSelect={ media => {
											props.setAttributes( {
												check_mark_icon_default:     media.id,
												check_mark_icon_default_url: media.url,
											} );
										} }
										type="image"
										value={ attributes.check_mark_icon_default }
										render={ ( { open } ) => (
											<Button
												isSecondary
												icon="edit"
												onClick={ open }
											>{ __( 'Select Icon' ) }</Button>
										) }
									/>
									{ attributes.check_mark_icon_default_url &&
									<Button
										onClick={ () => {
											props.setAttributes( {
												check_mark_icon_default: 0,
												check_mark_icon_default_url: '',
											} )
										} }
										isLink
										isDestructive
									>
										{ __( 'Remove Icon' ) }
									</Button>
									}
								</div>
								<div className="jet-media-control components-base-control">
									<div className="components-base-control__label">{ __( 'Checked Icon' ) }</div>
									{ attributes.check_mark_icon_checked_url && <img src={ attributes.check_mark_icon_checked_url } width="100%" height="auto"/> }
									<MediaUpload
										onSelect={ media => {
											props.setAttributes( {
												check_mark_icon_checked:     media.id,
												check_mark_icon_checked_url: media.url,
											} );
										} }
										type="image"
										value={ attributes.check_mark_icon_checked }
										render={ ( { open } ) => (
											<Button
												isSecondary
												icon="edit"
												onClick={ open }
											>{ __( 'Select Icon' ) }</Button>
										) }
									/>
									{ attributes.check_mark_icon_checked_url &&
									<Button
										onClick={ () => {
											props.setAttributes( {
												check_mark_icon_checked: 0,
												check_mark_icon_checked_url: '',
											} )
										} }
										isLink
										isDestructive
									>
										{ __( 'Remove Icon' ) }
									</Button>
									}
								</div>
							</PanelBody>
						</InspectorControls>
					),
					<Disabled key={ 'block_render' }>
						<ServerSideRender
							block="jet-engine/check-mark"
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
