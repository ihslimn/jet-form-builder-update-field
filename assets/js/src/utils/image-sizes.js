export function getAvailableImageSizes(imageID, callback) {
	$.post(
		ajaxurl, {
			action: 'jet_guten_get_available_image_sizes',
			image_id: imageID
		},
		(response) => {
			callback(response);
		}
	);
}

export function getImageSizeName(url, imageSizes) {
	let currentSize = imageSizes.find(size => {
		return size.value === url;
	});

	return currentSize ? currentSize.label : 'full';
}

export function getImageURLBySizeName(imageSizeName, imageSizes) {
	let currentSize = imageSizes.find(size => {
		return size.label === imageSizeName;
	});

	return currentSize ? currentSize.value : imageSizes[0].value;
}