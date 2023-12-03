<?php

namespace Jet_Form_Builder\Blocks\Button_Types;

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

class Button_Update extends Button_Type_Base {

	public function slug(): string {
		return 'update';
	}

	public function label(): string {
		return __( 'Update Field Options / Value', 'jet-form-builder' );
	}

	public function preset_label(): string {
		return __( 'Update', 'jet-form-builder' );
	}

	public function html_attrs(): array {
		return array(
			'class' => array(
				'button' => 'jet-form-builder__update',
			),
		);
	}

	public function before_render( $render, $args ) {
	
		if ( empty( $args['jfb_update_fields_button_name'] ) ) {
			return;
		}

		$render->add_attribute( 'data-update-button-name', $args['jfb_update_fields_button_name'] );
	
	}

}
