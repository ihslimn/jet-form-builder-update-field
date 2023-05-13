import { FIELD_TO_LISTEN, OPTIONS_LISTENER_ENABLED, VALUE_LISTENER_ENABLED, SUPPORTED_BLOCKS, CALLBACK } from './constants';

function registerAttributes( settings, name ) {

	if ( ! SUPPORTED_BLOCKS[ name ] ) {
		return settings;
	}

	settings.attributes = {
		...settings.attributes,
		[ OPTIONS_LISTENER_ENABLED ]: {
			type: 'boolean',
			default: false,
		},
		[ VALUE_LISTENER_ENABLED ]: {
			type: 'boolean',
			default: false,
		},
		[ FIELD_TO_LISTEN ]: {
			type: 'string',
			default: '',
		},
		[ CALLBACK ]: {
			type: 'string',
			default: '',
		},
	};

	return settings;
}

export default registerAttributes;