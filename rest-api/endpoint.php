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

		$blocks = \Jet_Form_Builder\Live_Form::instance()
		                   ->set_form_id( $form_id )
		                   ->set_specific_data_for_render( array() )
		                   ->setup_fields();



		// set up block structure
		jet_fb_context()->set_parsers(
			Block_Helper::get_blocks_by_post( $form_id )
		);
		
		try {
			$parser = jet_fb_context()->resolve_parser( $params->field_name );
		} catch ( Silence_Exception $exception ) {
			// field not founded
			return array( 'error' => true );
		}
		
		/** @noinspection PhpUnhandledExceptionInspection */
		/** @var Module $blocks */
		$f_blocks = jet_form_builder()->module( 'blocks' );
		
		/** @var Base $field */
		$field = $f_blocks->get_field_by_name( $parser->get_type() );
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



		
		$block = \Jet_Form_Builder\Blocks\Block_Helper::find_block_by_name( $field_name, $blocks );

		$result = array(
			'options' => false,
			'block'   => false,
		);

		if ( isset( $block['attrs']['jfb_update_fields_value_enabled'] ) ) {
			return array(
				'type'  => 'value',
				'value' => $this->get_value( $block['attrs'], $form_fields, $field_name, $form_id ),
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
			return call_user_func( $callback, $field_name, $form_fields, $form_id );
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