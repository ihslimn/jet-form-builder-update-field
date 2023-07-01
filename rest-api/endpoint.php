<?php

namespace JFB_Update_Field;

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

		$blocks = \Jet_Form_Builder\Live_Form::instance()
		                   ->set_form_id( $form_id )
		                   ->set_specific_data_for_render( array() )
		                   ->setup_fields();
		
		$block = \Jet_Form_Builder\Blocks\Block_Helper::find_block_by_name( $field_name, $blocks );

		$result = array(
			'options' => false,
			'block'   => false,
		);

		if ( isset( $block['attrs']['jfb_update_fields_value_enabled'] ) ) {
			return array(
				'type'  => 'value',
				'value' => $this->get_value( $block['attrs'], $item_id, $field_name, $form_id ),
			);
		}

		return array(
			'type'    => 'block',
			'value'   => render_block( $block ),
			'default' => $block['attrs']['default'],
		);

	}

	public function get_value( $block_attrs, $item_id, $field_name, $form_id ) {

		$result = '';

		$callback = $block_attrs['jfb_update_fields_callback'];

		if ( is_callable( $callback ) ) {
			return call_user_func( $callback, $item_id, $field_name, $form_id );
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