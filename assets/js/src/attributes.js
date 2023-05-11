import { FIELD_TO_LISTEN } from './constants';

function registerAttribute( settings, name ) {

	settings.attributes = {
		...settings.attributes,
		[ FIELD_TO_LISTEN ]: {
			type: 'string',
			default: ''
			,
		},
	};

	return settings;
}

export default registerAttribute;