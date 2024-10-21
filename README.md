# jet-form-builder-update-field

Allows updating field options / values on another field(s) update.

To refer to repeater field, write inner repeater field in square braces, like `[text_field1]`.

Updating field options 
---
This example **requires** JetEngine to be installed; otherwise, custom options Generator should be created - see Advanced section.

Works for Select, Radio, Checkboxes fields

1. Enable options updater, set the field to get options from JetEngine Query Generator

![image](https://github.com/ihslimn/jet-form-builder-update-field/assets/57287929/8f31ccba-6075-4325-93fe-fb6d43ece251)

See https://jetformbuilder.com/features/multi-optional-field-source-settings/ to set up a field using Get values list from JetEngine Query generator

2. In the query, you may use the fact that form fields values are stored to `$_REQUEST['jfb_update_related_' . $field_name]`, e.g. `$_REQUEST['jfb_update_related_select1']`
to update options accordingly. In this example, in the field 'select2' we get posts, related to post selected in the field 'select1'

**Also**, there is a macro \
![image](https://github.com/ihslimn/jet-form-builder-update-field/assets/57287929/98766648-e0c6-4aa9-b0da-bf75db568482) \
 _JFB Update Field - Form Field Value_ that you can use, 
 
 and a source for Relation macros \
 ![image](https://github.com/ihslimn/jet-form-builder-update-field/assets/57287929/7419560d-25d9-48fa-b677-942b222a9b90) \
 added by this addon.

### Examples:

#### Get related items based on a form field

We set Related Items macro to get initial object ID from jfb_update_related_select1, so that when we choose the post in the field 'select1', 'select2' will be populated with posts, related to post from the field 'select1'

![image](https://github.com/ihslimn/jet-form-builder-update-field/assets/57287929/4818c002-9a58-44f9-955e-504f7794d1ce)

Don't forget to set a fallback, so that up until selection in 'select1' there will be no posts in 'select2'

Alternatively, use _JFB Update Field - Form Field Value_ macro to do the same: \
![image](https://github.com/ihslimn/jet-form-builder-update-field/assets/57287929/64520ab6-186b-4bdb-b1a2-19114ee5d39c)

#### Get terms, which are children of term from the form

![image](https://github.com/ihslimn/jet-form-builder-update-field/assets/57287929/55f3ae06-c1b4-44df-b352-39286e066892)


---

Updating field value
---
This example **requires** JetEngine to be installed; otherwise, use custom callback - see Advanced section

Works for Text, Textarea, Hidden fields

1. Enable value updater

![image](https://github.com/ihslimn/jet-form-builder-update-field/assets/57287929/8030b07b-e3af-4262-9df7-043b48448f0a)

242|post_title - 242 is an ID of the query you will use, post_title is a parameter that will be retrieved from the first query item.

2. Query is set up like this:

![image](https://github.com/ihslimn/jet-form-builder-update-field/assets/57287929/6cef835d-cdb3-4a77-83f9-c21508bee53c)

Like in Updating field options example, we use jfb_update_related_select1 variable. Don't forget to set a fallback too.

---

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
