<?php

namespace JFB_Update_Field;

use Jet_Engine;
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
			'jet-forms/date-field'     => 'value',
			'jet-forms/datetime-field' => 'value',
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

		$params = json_decode( $request->get_body(), true );

		$form_id     = $params['form_id'];
		$field_name  = $params['field_name'];
		$form_fields = $params['form_fields'];
		
		$storage = Plugin::instance()->storage;

		foreach ( $form_fields as $name => $value ) {
			$_REQUEST['jfb_update_related_' . $name] = $value;
		}

		//setup form context
		$blocks = Block_Helper::get_blocks_by_post( $form_id );
		jet_fb_handler()->set_form_id( $form_id );
		jet_fb_context()->set_request( $form_fields );
		jet_fb_context()->apply( $blocks );
		
		$is_inner = preg_match( '/(?<field_name>.+)\[(?<index>\d+)\]\[(?<sub_name>.+?)\](\[\])?/', $field_name, $matches );
		$is_inner = filter_var( $is_inner, FILTER_VALIDATE_BOOLEAN );

		if ( $is_inner ) {
			$field_name = $matches['field_name'];
			$sub_name   = $matches['sub_name'];
			$index      = $matches['index'];
		}

		$block = \Jet_Form_Builder\Blocks\Block_Helper::find_block_by_name( $field_name, $blocks );

		if ( ! $is_inner && $block['blockName'] === 'jet-forms/repeater-field' ) {
			$params = $block['attrs']['jfb_update_fields_callback'] ?? false;
			
			if ( is_callable( $params ) ) {
				$value = $this->get_value(
					$block['attrs'],
					$field_name,
					$form_id,
					$form_fields
				);

				$value = $this->prepare_value( $value, $block );
			} else {
				$value = $this->get_repeater_value( $params, $field_name, $form_id, $form_fields );
			}

			if ( empty( $value ) && isset( $block['attrs']['default'] ) ) {
				$value = $block['attrs']['default'];
			}

			if ( ! is_array( $value ) ) {
				$value = array();
			}

			return array(
				'type'  => 'repeater',
				'value' => $value,
			);
		}

		if ( $is_inner && $block['blockName'] !== 'jet-forms/repeater-field' ) {
			return array(
				'type'  => 'error',
				'value' => 'This field does not have Field Updater enabled or its settings are invalid.',
			);
		}

		if ( $is_inner && ! empty( $block['innerBlocks'] ) ) {
			$block = \Jet_Form_Builder\Blocks\Block_Helper::find_block_by_name( $sub_name, $block['innerBlocks'] );

			$storage->set_context( $field_name );
		}

		if ( $is_inner ) {
			$field_path = array( $field_name, $index, $sub_name );
		} else {
			$field_path = array( $field_name );
		}
		
		try {
			$parser = jet_fb_context()->resolve_parser( $field_path );
		} catch ( \Jet_Form_Builder\Exceptions\Silence_Exception $exception ) {
			// field not found
			return array(
				'type'  => 'error',
				'value' => 'Field not found.',
			);
		}

		if ( $is_inner ) {
			$storage->set_context( $parser->get_context() );
			do_action( 'jet-form-builder/field-updater/request/repeater', $parser->get_context() );
		}

		if ( ! empty( $block['attrs']['jfb_update_fields_value_enabled'] ) && $this->get_support_type( $block ) === 'value' ) {

			$value = $this->get_value(
				$block['attrs'],
				$field_name,
				$form_id,
				$form_fields
			);

			$value = $this->prepare_value( $value, $block );

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
					'isInner' => $is_inner,
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
					'isInner' => $is_inner,
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
					'isInner' => $is_inner,
				);
		}

	}

	public function get_value( $block_attrs, $field_name, $form_id, $form_fields ) {

		$result = '';
		
		$callback = $block_attrs['jfb_update_fields_callback'] ?? false;

		if ( ! $callback ) {
			return $result;
		}

		if ( is_callable( $callback ) ) {
			return call_user_func( $callback, $field_name, $form_id, $form_fields );
		}

		if ( 0 === strpos( $callback, 'jet-engine-helpers/' ) ) {
			return Jet_Engine_Helpers::apply_callback( $callback, $form_fields );
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

	public function prepare_value( $value, $block ) {
		$field_type = str_replace( 'jet-forms/', '', $block['blockName'] );

		switch ( $field_type ) {
			case 'date-field':
				if ( ! is_scalar( $value ) ) {
					return '';
				}

				$value = trim( $value );

				if ( ! preg_match( '/^\d{4}-\d{2}-\d{2}$/', $value ) ) {
					if ( ! \Jet_Engine_Tools::is_valid_timestamp( $value ) ) {
						$value = strtotime( $value );
					}

					if ( $value !== false ) {
						return wp_date( 'Y-m-d', $value );
					} else {
						return '';
					}
				}

				break;
			case 'datetime-field':
				if ( ! is_scalar( $value ) ) {
					return '';
				}
				
				$value = trim( $value );

				if ( ! preg_match( '/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/', $value ) ) {
					if ( ! \Jet_Engine_Tools::is_valid_timestamp( $value ) ) {
						$value = strtotime( $value );
					}

					if ( $value !== false ) {
						return wp_date( 'Y-m-d H:i', $value );
					} else {
						return '';
					}
				}

				break;
		}

		return $value;
	}

	public function get_repeater_value( $params, $field_name, $form_id, $form_fields ) {
		if ( ! function_exists( 'jet_engine' ) ) {
			return array();
		}

		if ( ! is_array( $params ) ) {
			$params = str_replace( 'jfbuf-repeater/', '', $params );
			$params = explode( '/', $params );
		}

		if ( count( $params ) < 2 ) {
			return;
		}

		$result      = array();
		$object_type = $params[0];
		$object_id   = $form_fields[ $params[1] ];

		$object = null;

		switch ( $object_type ) {
			case 'post':
				$object = get_post( $object_id );
				break;
			case 'term':
				$object = get_term( $object_id );
				break;
			case 'user':
				$object = get_user_by( 'ID', $object_id );
				break;
			case 'cct':
				$module_active = jet_engine()->modules->is_module_active( 'custom-content-types' );

				if ( ! $module_active ) {
					break;
				}

				$cct_slug = $params[2] ?? false;

				if ( ! $cct_slug ) {
					break;
				}

				$type_object = \Jet_Engine\Modules\Custom_Content_Types\Module::instance()->manager->get_content_types( $cct_slug );

				if ( ! $type_object ) {
					break;
				}

				$flag = OBJECT;
				$type_object->db->set_format_flag( $flag );

				$item_id = $object_id;
				$object  = $type_object->db->get_item( $item_id );
				break;
		}

		if ( ! is_object( $object ) || is_wp_error( $object ) ) {
			return array();
		}

		$result = jet_engine()->listings->data->get_meta( $field_name, $object );

		if ( is_array( $result ) ) {
			$result = array_values( $result );
		}

		return $result;
	}

}
