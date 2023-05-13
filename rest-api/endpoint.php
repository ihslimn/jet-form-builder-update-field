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
				'methods'             => 'GET',
				'callback'            => array( $this, 'callback' ),
				'permission_callback' => '__return_true',
				'args' => array(
					'form_id' => array(
						'required' => true,
					),
					'field_name' => array(
						'required' => true,
					),
					'item_id' => array(
						'required' => true,
					),
				),
			)
		);
	}

	public function callback( $request ) {

		$params = $request->get_params();

		$form_id    = $params['form_id'];
		$field_name = $params['field_name'];
		$item_id    = $params['item_id'];

		$_REQUEST['jfb_update_related_' . $field_name] = $item_id;

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
			$block['attrs']['default'] = $this->get_value( $block['attrs'], $item_id, $field_name, $form_id );
		}

		switch ( $block['blockName'] ) {
			case 'jet-forms/select-field':
				$result['options'] = $this->get_field_options( $block );
				break;
			default:
				$result['block'] = render_block( $block );
		}

		return $result;

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

	public function get_field_options( $block ) {

		$block_w = new \Jet_Form_Builder\Blocks\Types\Select_Field();
		$block['attrs']['default'] = '';
		$block_w->block_attrs = $block['attrs'];

		return $block_w->get_field_options();

	}

}