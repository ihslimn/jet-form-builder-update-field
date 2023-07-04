# jet-form-builder-update-field

Allows updating field options / values on another field(s) update.

Updating field options 
---
This example **requires** JetEngine to be installed; otherwise, custom options Generator should be created - see Advanced section.

1. Enable options updater, set the field to get options from JetEngine Query Generator

![image](https://github.com/ihslimn/jet-form-builder-update-field/assets/57287929/8f31ccba-6075-4325-93fe-fb6d43ece251)


2. In the query, you may use the fact that form fields values are stored to `$_REQUEST['jfb_update_related_' . $field_name]`, e.g. `$_REQUEST['jfb_update_related_select1']`
to update options accordingly. In this example, in the field 'select2' we get posts, related to post selected in the field 'select1'

We set Related Items macro to get initial object ID from jfb_update_related_select1, so that when we choose the post in the field 'select1', 'select2' will be populated with posts, related to post from the field 'select1'

![image](https://github.com/ihslimn/jet-form-builder-update-field/assets/57287929/4818c002-9a58-44f9-955e-504f7794d1ce)

Don't forget to set a fallback, so that up until selection in 'select1' there will be no posts in 'select2'

Updating field value
---
This example **requires** JetEngine to be installed; otherwise, use custom callback - see Advanced section

1. Enable value updater

![image](https://github.com/ihslimn/jet-form-builder-update-field/assets/57287929/8030b07b-e3af-4262-9df7-043b48448f0a)

242|post_title - 242 is an ID of the query you will use, post_title is a parameter that will be retrieved from the first query item.

2. Query is set up like this:

![image](https://github.com/ihslimn/jet-form-builder-update-field/assets/57287929/6cef835d-cdb3-4a77-83f9-c21508bee53c)

Like in Updating field options example, we use jfb_update_related_select1 variable. Don't forget to set a fallback too.

Advanced
---
https://github.com/ihslimn/jet-forms-generate-from-posts-query example of registering a generator. Form field values are stored into `$_REQUEST['jfb_update_related_' . $field_name]`

To update field value with a custom callback, register a function, for example:
```php
function jfbu_get_post_date( $field_name, $form_id, $form_fields ) {
	
	if ( $form_id !== 28447 || $field_name !== 'text_field' || empty( $form_fields['select1'] ) ) {
		return;
	}
	
	$post = get_post( $form_fields['select1'] );
	
	if ( ! $post ) {
		return;
	}
	
	return $post->post_date;
	
}
```

and use it in options

![image](https://github.com/ihslimn/jet-form-builder-update-field/assets/57287929/7410d231-8111-4cbb-afa1-7b8bc7b88be0)
