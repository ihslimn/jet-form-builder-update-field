const className = 'jet-guten-image-slector';

const {
	__
} = wp.i18n;

const {
	Button,
	SelectControl
} = wp.components;
const {
	MediaUpload,
} = wp.editor;
const {
	select
} = wp.data;
const {
	getMedia
} = select('core');
const {
	Component,
} = wp.element;
const {
	compose
} = wp.compose;
const {
	withSelect
} = wp.data;

const {
	get,
	isEmpty,
	map,
	startCase,
	findKey
} = lodash;

class ImageSlector extends Component {
	getAvailableSizes() {
		return get(this.props.imageData, ['media_details', 'sizes'], {});
	}

	checkImage() {
		if (!this.props.image.url) {
			let size = this.props.image.size ? this.props.image.size : 'full',
				urlData = get(this.props.imageData.media_details.sizes, [size]),
				url = urlData ? urlData.source_url : this.props.imageData.media_details.sizes.full.source_url;

			this.updateImage({
				url,
				size
			});
		}
	}

	updateImage(imageData) {
		this.props.onChangeImage(Object.assign(
			this.props.image,
			imageData
		));
	}

	render() {
		const availableSizes = this.getAvailableSizes();

		let imageID,
			imageURL;

		if (this.props.imageData) {
			imageID = this.props.imageData.id;
			imageURL = this.props.imageData.media_details.sizes.full.source_url;

			this.checkImage(this.props.image);
		}

		return (
			<div className={className}>
				<MediaUpload
					onSelect={media =>
						this.updateImage({
							id:media.id,
							url: ''
						})
					}
					type="image"
					value={imageID}
					render={({ open }) => [
						!imageURL && !this.props.image.url && (
							<Button
								className={`button button-large ${className}__btn`}
								onClick={open}
							>
								{__("Select Image")}
							</Button>
						),
						imageURL && (
							<Button
								onClick={open}
							>
								<img className={`${className}__img`} src={imageURL} alt={ __( 'Selected image' ) } />
							</Button>
						)
					]}
				/>
				{ ! isEmpty( availableSizes ) && (
					<SelectControl
						label={ __( 'Image Size' ) }
						value={ this.props.image.url }
						options={ map( availableSizes, ( size, name ) => ( {
							value: size.source_url,
							label: startCase( name ),
						} ) ) }
						onChange={ newImageUrl => {
							let size = findKey(availableSizes, keyData => {
								return keyData.source_url === newImageUrl;
							});
							this.updateImage({
								url: newImageUrl,
								size: size
							})
						} }
					/>
				) }
				{ imageURL && (
					<Button
						className="components-button is-link is-destructive"
						onClick={()=> this.updateImage({
							id: null,
							url: ''
						})}
					>
						{__( 'Remove featured image' )}
					</Button>
				)}
			</div>
		);
	}
}

export default compose([
	withSelect((select, props) => {
		const {
			getMedia
		} = select('core');
		const {
			image
		} = props;
		const imageID = get(image, ['id']);

		return {
			imageData: imageID ? getMedia(imageID) : null,
		}
	})
])(ImageSlector);