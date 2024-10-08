import {
	FIELD_TO_LISTEN,
	LISTEN_ALL,
	OPTIONS_LISTENER_ENABLED,
	VALUE_LISTENER_ENABLED,
	SUPPORTED_BLOCKS,
	CALLBACK,
	UPDATE_ON_BUTTON,
	BUTTON_NAME,
	CACHE_ENABLED,
	CACHE_TIMEOUT,
} from './constants';

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
		[ LISTEN_ALL ]: {
			type: 'boolean',
			default: false,
		},
		[ CALLBACK ]: {
			type: 'string',
			default: '',
		},
		[ UPDATE_ON_BUTTON ]: {
			type: 'boolean',
			default: false,
		},
		[ BUTTON_NAME ]: {
			type: 'string',
			default: '',
		},
		[ CACHE_ENABLED ]: {
			type: 'boolean',
			default: true,
		},
		[ CACHE_TIMEOUT ]: {
			type: 'string',
			default: '60',
		},
	};

	return settings;
}

export default registerAttributes;