export default function getRawSvgByID( imageID, callback ) {
	$.get(
		ajaxurl, {
			action: 'jet_engine_blocks_get_raw_svg',
			image_id: imageID
		},
		( response ) => {
			callback( response );
		}
	);
}
