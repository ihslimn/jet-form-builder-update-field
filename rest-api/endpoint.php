<?php

namespace JFB_Update_Field;

use \Jet_Form_Builder\Blocks\Block_Helper;
use \Jet_Form_Builder\Blocks\Render\Checkbox_Field_Render;
use \Jet_Form_Builder\Blocks\Render\Radio_Field_Render;
use \Jet_Form_Builder\Blocks\Render\Select_Field_Render;

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die();
}

class Endpoint {

	public function __construct() {
		add_action( 'rest_api_init', array( $this, 'register_route' ) );
	}

	public function register_route() {

		register_rest_route( 
			'jet-form-builder-update-field-addon/v1', 
			'/get-field', 
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'callback' ),
				'permission_callback' => '__return_true',
				'args' => array(),
			)
		);

	}

	public function callback( $request ) {

		$params = json_decode( $request->get_body() );

		$form_id     = $params->form_id;
		$field_name  = $params->field_name;
		$form_fields = ( array ) $params->form_fields;

		foreach ( $form_fields as $name => $value ) {
			$_REQUEST['jfb_update_related_' . $name] = $value;
		}

		$blocks = Block_Helper::get_blocks_by_post( $form_id );

		$block = \Jet_Form_Builder\Blocks\Block_Helper::find_block_by_name( $field_name, $blocks );

		if ( isset( $block['attrs']['jfb_update_fields_value_enabled'] ) ) {
			return array(
				'type'  => 'value',
				'value' => $this->get_value( $block['attrs'], $field_name, $form_id, $form_fields ),
			);
		}

		// set up block structure
		jet_fb_context()->set_parsers(
			$blocks
		);
		
		try {
			$parser = jet_fb_context()->resolve_parser( $params->field_name );
		} catch ( Silence_Exception $exception ) {
			// field not found
			return array( 'error' => true );
		}
		
		/** @noinspection PhpUnhandledExceptionInspection */
		/** @var Module $blocks */
		$blocks_module = jet_form_builder()->module( 'blocks' );
		
		/** @var Base $field */
		$field = $blocks_module->get_field_by_name( $parser->get_type() );
		$field->set_block_data( $parser->get_settings() );
		
		switch ( $parser->get_type() ) {
			case 'checkbox-field':
				$render = new Checkbox_Field_Render( $field );
				$render->render_without_layout();
				return array(
					'type'    => 'block',
					'value'   => $render->render_options(),
					'isEmpty' => ( count( $render->args['field_options'] ) < 2 && empty( array_key_first( $render->args['field_options'] ) ) ),
				);
			case 'radio-field':
				$render = new Radio_Field_Render( $field );
				$render->render_without_layout();
				return array(
					'type'    => 'block',
					'value'   => $render->render_options(),
					'isEmpty' => ( count( $render->args['field_options'] ) < 2 && empty( array_key_first( $render->args['field_options'] ) ) ),
				);
			case 'select-field':
				$render = new Select_Field_Render( $field );
				$render->render_without_layout();
				return array(
					'type'    => 'options',
					'value'   => $render->args['field_options'],
				);
		}

	}

	public function get_value( $block_attrs, $field_name, $form_id, $form_fields ) {

		$result = '';

		$callback = $block_attrs['jfb_update_fields_callback'];

		if ( is_callable( $callback ) ) {
			return call_user_func( $callback, $field_name, $form_id, $form_fields );
		}

		if ( ! class_exists( '\Jet_Engine\Query_Builder\Manager' ) ) {
			return $result;
		}

		$params = explode( '|', $callback );

		if ( count( $params ) < 2 ) {
			return $result;
		}

		$query_id = $params[0];
		$property = $params[1];

		$query = \Jet_Engine\Query_Builder\Manager::instance()->get_query_by_id( $query_id );

		if ( ! $query ) {
			return $result;
		}

		$query_items = $query->get_items();
		
		if ( empty( $query_items ) ) {
			return $result;
		}

		$vars = get_object_vars( $query_items[0] );

		$result = $vars[ $property ] ?? '';

		return $result;

	}

}