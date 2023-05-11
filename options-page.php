<?php

class JEC_Options {
	
	public function __construct() {
		add_action( 'init', array( $this, 'register_options_page' ), 20 );
	}

	public function register_options_page() {

		$args = array (
		  'slug' => 'jec-track-options',
		  'labels' => 
		  array (
		    'name' => 'JEC - Track Meta Options',
		    'menu_name' => 'JEC - Track Meta Options',
		  ),
		  'fields' => 
		  array (
		    array (
				'title' => 'Field key',
				'name' => 'field_key',
				'object_type' => 'field',
				'width' => '100%',
				'type' => 'text',
				'description' => 'Key of the tracked meta field',
			),
			array (
				'title' => 'Post types',
				'name' => 'post_types',
				'object_type' => 'field',
				'width' => '100%',
				'type' => 'text',
				'description' => 'Post types which have the meta field, comma-separated',
			),
			array (
				'title' => 'Email format',
				'name' => 'email_format',
				'object_type' => 'field',
				'width' => '100%',
				'type' => 'wysiwyg',
				'description' => 'Email format; use {post_name}, {old_value}, {new_value}, {post_url} for dynamic values',
			),
		  ),
		  'parent' => 'options-general.php',
		  'icon' => 'dashicons-bell',
		  'capability' => 'manage_options',
		  'position' => '',
		  'hide_field_names' => false,
		);

		new \Jet_Engine_Options_Page_Factory( $args );

	}

}
