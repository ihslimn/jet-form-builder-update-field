<?php

namespace JFB_Update_Field;

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die();
}

class Form_Field_Value extends \Jet_Engine_Base_Macros {

    public function macros_tag() {
        return 'jfbuf_form_field_value';
    }

    public function macros_name() {
        return 'JFB Update Field - Form Field Value';
    }

    public function macros_args() {
        return array(
            'field_name'    => array(
                'label'   => 'Field name',
                'type'    => 'text',
                'default' => '',
            ),
        );
    }

    public function macros_callback( $args = array() ) {

        $field_name = ! empty( $args['field_name'] ) ? $args['field_name'] : null;

        if ( ! $field_name ) {
            return '';
        }

        return Plugin::instance()->storage->get_field_value( $field_name );

    }
}
