<?php

namespace JFB_Update_Field;

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die();
}

class Storage {

	private $form_fields = array();

	private $context = '';
	private $index   = -1;

	public function set_context( $context ) {
		$this->context = $context;
	}

	public function set_index( $index ) {
		$this->index = $index;
	}

	public function save_field_value( $field_name, $value ) {
		$this->form_fields[ $field_name ] = $value;
	}

	public function get_values() {
		return $this->form_fields;
	}

	public function get_field_value( $field_name ) {
		if ( preg_match( '/(?<field_name>.+)\[(?<index>\d+)\]\[(?<sub_name>.+)\]/', $field_name, $matches ) ) {
			$field_name = $matches['field_name'];
			$sub_name   = $matches['sub_name'];
			$index      = $matches['index'];

			return  $this->form_fields[ $field_name ][ $index ][ $sub_name ] ?? '';
		}

		if ( $this->context && $this->index >= 0 && preg_match( '/\[(?<sub_name>.+)\]/', $field_name, $matches ) ) {
			return  $this->form_fields[ $this->context ][ $this->index ][ $matches['sub_name'] ] ?? '';
		}

		return $this->form_fields[ $field_name ] ?? '';
	}

}
