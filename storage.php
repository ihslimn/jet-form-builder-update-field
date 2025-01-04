<?php

namespace JFB_Update_Field;

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die();
}

class Storage {

	private $context;

	public function get_values() {
		return jet_fb_context()->resolve_request();
	}

	public function set_context( $context ) {
		$this->context = $context;
	}

	public function get_field_value( $field_name ) {
		if ( preg_match( '/(?<field_name>.+)\[(?<index>\d+)\]\[(?<sub_name>.+)\]/', $field_name, $matches ) ) {
			$field_name = $matches['field_name'];
			$sub_name   = $matches['sub_name'];
			$index      = $matches['index'];

			return jet_fb_context()->resolve_request()[ $field_name ][ $index ][ $sub_name ] ?? '';
		}

		if ( is_object( $this->context ) && method_exists( $this->context, 'get_request' ) && preg_match( '/\[(?<sub_name>.+)\]/', $field_name, $matches ) ) {
			return $this->context->get_request()[ $matches['sub_name'] ] ?? '';
		}

		return jet_fb_context()->resolve_request()[ $field_name ] ?? '';
	}

}
