const OPTIONS_LISTENER_ENABLED = 'jfb_update_fields_options_enabled';
const VALUE_LISTENER_ENABLED = 'jfb_update_fields_value_enabled';
const UPDATE_ON_BUTTON = 'jfb_update_fields_update_on_button';
const BUTTON_NAME = 'jfb_update_fields_button_name';
const FIELD_TO_LISTEN = 'jfb_update_fields_field_to_listen';
const CALLBACK = 'jfb_update_fields_callback';
const LISTEN_ALL = 'jfb_update_fields_listen_all';
const CACHE_ENABLED = 'jfb_update_fields_cache_enabled';
const CACHE_TIMEOUT = 'jfb_update_fields_cache_timeout';
const SUPPORTED_BLOCKS = {
				'jet-forms/select-field' : 'options',
				'jet-forms/radio-field' : 'options',
				'jet-forms/checkbox-field' : 'options',
				'jet-forms/text-field' : 'value',
				'jet-forms/number-field' : 'value',
				'jet-forms/textarea-field' : 'value',
				'jet-forms/hidden-field' : 'value',
				'jet-forms/submit-field' : 'update_other',
			};

export {
	OPTIONS_LISTENER_ENABLED,
	VALUE_LISTENER_ENABLED,
	UPDATE_ON_BUTTON,
	BUTTON_NAME,
	FIELD_TO_LISTEN,
	LISTEN_ALL,
	SUPPORTED_BLOCKS,
	CALLBACK,
	CACHE_ENABLED,
	CACHE_TIMEOUT,
};