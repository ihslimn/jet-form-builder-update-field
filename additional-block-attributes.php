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

		add_filter( 'jet-form-builder/render/checkbox-field', array( $this, 'append_empty_option' ) );
		add_filter( 'jet-form-builder/render/radio-field', array( $this, 'append_empty_option' ) );

		add_filter( 'jet-form-builder/render/hidden-field', array( $this, 'add_attributes_hidden' ), 0, 2 );
		
	}

	public function append_empty_option( $args ) {

		if ( $args['type'] === 'checkbox-field' && ! is_array( $args['default'] ) ) {
			$args['default'] = array( $args['default'] );
		}
		
		if ( ! empty( $args['field_options'] ) ) {
			return $args;
		}

		if ( ! empty( $args['jfb_update_fields_options_enabled'] ) ) {
			$args['field_options'] = array(
				'' => 'This field has no options'
			);
		}

		return $args;

	}

	public function add_class( $attrs ) {

		return in_array( $attrs['type'] ?? '', array( 'radio-field', 'checkbox-field' ) );

	}

	public function add_attributes( $block ) {

		$attrs = $block->block_attrs;

		if ( empty( $attrs['name'] ) ) {
			return;
		}

		$block->add_attribute( 'data-update-field-name', $attrs['name'] );

		if ( empty( $attrs['jfb_update_fields_options_enabled'] ) && empty( $attrs['jfb_update_fields_value_enabled'] ) ) {
			return;
		}

		if ( $this->add_class( $attrs ) && ! empty( $attrs['jfb_update_fields_options_enabled'] ) && empty( $attrs['field_options'] ) ) {
			$block->add_attribute( 'data-update-field-is-empty', 'true' );
		}

		if ( ! $this->script_enqueued ) {
			$this->enqueue_script();
			$this->script_enqueued = true;
		}

		if ( ! empty( $attrs['jfb_update_fields_field_to_listen'] ) ) {
			$block->add_attribute( 'data-update-listen-to', $attrs['jfb_update_fields_field_to_listen'] );
		}

		if ( ! empty( $attrs['jfb_update_fields_update_on_button'] ) ) {
			$block->add_attribute( 'data-update-on-button', $attrs['jfb_update_fields_button_name'] );
		}

	}

	public function add_attributes_hidden( $attrs, $block ) {

		if ( empty( $attrs['name'] ) ) {
			return $attrs;
		}

		$service_fields = array(
			jet_fb_handler()->form_key    => true,
			jet_fb_handler()->refer_key   => true,
			jet_fb_handler()->post_id_key => true,
		);

		if ( isset( $service_fields[ $attrs['name'] ] ) ) {
			return $attrs;
		}

		$block->add_attribute( 'data-update-field-name', $attrs['name'] );

		if ( empty( $attrs['jfb_update_fields_value_enabled'] ) || empty( $attrs['jfb_update_fields_field_to_listen'] ) ) {
			return $attrs;
		}

		$block->add_attribute( 'data-update-listen-to', $attrs['jfb_update_fields_field_to_listen'] );

		if ( ! $this->script_enqueued ) {
			$this->enqueue_script();
			$this->script_enqueued = true;
		}

		return $attrs;

	}

	public function register_script() {

		wp_register_script(
			'jfb-update-field-frontend',
			plugins_url( 'assets/js/frontend.js', __FILE__ ),
			array( 'jquery', 'wp-api-fetch' ),
			Plugin::instance()->get_version(),
			true
		);

		wp_register_style(
			'jfb-update-field-frontend',
			plugins_url( 'assets/css/frontend.css', __FILE__ ),
			array(),
			Plugin::instance()->get_version(),
			false
		);

	}

	public function enqueue_script() {
		wp_enqueue_script( 'jfb-update-field-frontend' );
		wp_enqueue_style( 'jfb-update-field-frontend' );
	}

}
