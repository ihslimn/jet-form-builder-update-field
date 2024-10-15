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

	public function get_supported_blocks( $name = '' ) {
		$supported_blocks =  array(
			'jet-forms/select-field'   => 'options',
			'jet-forms/radio-field'    => 'options',
			'jet-forms/checkbox-field' => 'options',
			'jet-forms/text-field'     => 'value',
			'jet-forms/number-field'   => 'value',
			'jet-forms/textarea-field' => 'value',
			'jet-forms/hidden-field'   => 'value',
		);

		if ( empty( $name ) ) {
			return $supported_blocks;
		}

		return $supported_blocks[ $name ] ?? false;
	}

	public function get_support_type( $attrs ) {
		$block_name = $attrs['blockName'];
		return $this->get_supported_blocks( $block_name );
	}

	public function callback( $request ) {

		$params = json_decode( $request->get_body() );

		$form_id     = $params->form_id;
		$field_name  = $params->field_name;
		$form_fields = ( array ) $params->form_fields;

		foreach ( $form_fields as $name => $value ) {
			$_REQUEST['jfb_update_related_' . $name] = $value;
			Plugin::instance()->storage->save_field_value( $name, $value );
		}

		$blocks = Block_Helper::get_blocks_by_post( $form_id );

		$block = \Jet_Form_Builder\Blocks\Block_Helper::find_block_by_name( $field_name, $blocks );

		if ( ! empty( $block['attrs']['jfb_update_fields_value_enabled'] ) && $this->get_support_type( $block ) === 'value' ) {

			$value = $this->get_value( $block['attrs'], $field_name, $form_id, $form_fields );

			if ( empty( $value ) && isset( $block['attrs']['default'] ) ) {
				$value = $block['attrs']['default'];
			}

			return array(
				'type'  => 'value',
				'value' => $value,
			);
			
		}

		if ( empty( $block['attrs']['jfb_update_fields_options_enabled'] ) || $this->get_support_type( $block ) !== 'options' ) {
			return array(
				'type'  => 'error',
				'value' => 'This field does not have Field Updater enabled or its settings are invalid.',
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
		
		//since JetFormBuilder 3.3.1
		try {
			$module = jet_form_builder()->module( 'option-field' );
		} catch ( \Jet_Form_Builder\Exceptions\Repository_Exception $e ) {
			$module = false;
		}

		switch ( $parser->get_type() ) {
			case 'checkbox-field':
				$render = new Checkbox_Field_Render( $field );
				//since JetFormBuilder 3.3.1
				if ( $module ) {
					$module->apply_field_options( $render->block_type );
				}
				$render->render_without_layout();
				$options = is_array( $render->args['field_options'] ) ? $render->args['field_options'] : array();
				return array(
					'type'    => 'block',
					'value'   => $render->render_options(),
					'isEmpty' => ( count( $options ) < 2 && empty( $options[0]['value'] ) ),
				);
			case 'radio-field':
				$render = new Radio_Field_Render( $field );
				//since JetFormBuilder 3.3.1
				if ( $module ) {
					$module->apply_field_options( $render->block_type );
				}
				$render->render_without_layout();
				$options = is_array( $render->args['field_options'] ) ? $render->args['field_options'] : array();
				return array(
					'type'    => 'block',
					'value'   => $render->render_options(),
					'isEmpty' => ( count( $options ) < 2 && empty( $options[0]['value'] ) ),
				);
			case 'select-field':
				$render = new Select_Field_Render( $field );
				//since JetFormBuilder 3.3.1
				if ( $module ) {
					$module->apply_field_options( $render->block_type );
				}
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
