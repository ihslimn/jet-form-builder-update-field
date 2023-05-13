const OPTIONS_LISTENER_ENABLED = 'jfb_update_fields_options_enabled';
const VALUE_LISTENER_ENABLED = 'jfb_update_fields_value_enabled';
const FIELD_TO_LISTEN = 'jfb_update_fields_field_to_listen';
const CALLBACK = 'jfb_update_fields_callback';
const SUPPORTED_BLOCKS = {
				'jet-forms/select-field' : 'options',
				'jet-forms/radio-field' : 'options',
				'jet-forms/checkbox-field' : 'options',
				'jet-forms/text-field' : 'value',
				'jet-forms/textarea-field' : 'value',
				'jet-forms/hidden-field' : 'value',
			};

export {
	OPTIONS_LISTENER_ENABLED,
	VALUE_LISTENER_ENABLED,
	FIELD_TO_LISTEN,
	SUPPORTED_BLOCKS,
	CALLBACK,
};