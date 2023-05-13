<?php

namespace JFB_Update_Field;

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die();
}

class Additional_Block_Attributes {

	public $script_enqueued = false;

	public function __construct() {

		add_action( 'jet-form-builder/before-start-form-row', array( $this, 'add_attributes' ) );	
		
		add_action( 'wp_enqueue_scripts', array( $this, 'register_script' ) );
		
	}

	public function add_attributes( $block ) {

		$attrs = $block->block_attrs;

		if ( empty( $attrs['jfb_update_fields_options_enabled'] ) && empty( $attrs['jfb_update_fields_value_enabled'] ) ) {
			return;
		}

		$block->add_attribute( 'data-update-field-addon-enabled', 'true' );

		$block->add_attribute( 'data-update-field-name', $attrs['name'] );

		if ( ! $this->script_enqueued ) {
			$this->enqueue_script();
			$this->script_enqueued = true;
		}

		if ( ! empty( $attrs['jfb_update_fields_field_to_listen'] ) ) {
			$block->add_attribute( 'data-update-listen-to', $attrs['jfb_update_fields_field_to_listen'] );
		}

	}

	public function register_script() {

		wp_register_script(
			'jfb-update-field-frontend',
			plugins_url( 'assets/js/frontend.js', __FILE__ ),
			array( 'jquery' ),
			'1.0.0',
			true
		);

	}

	public function enqueue_script() {
		wp_enqueue_script( 'jfb-update-field-frontend' );
	}

}
