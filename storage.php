<?php

namespace JFB_Update_Field;

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die();
}

class Storage {

    private $form_fields = array();

    public function save_field_value( $field_name, $value ) {
        $this->form_fields[ $field_name ] = $value;
    }

    public function get_field_value( $field_name ) {
        return $this->form_fields[ $field_name ] ?? '';
    } 

}
