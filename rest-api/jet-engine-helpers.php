<?php

namespace JFB_Update_Field;

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die();
}

class Jet_Engine_Helpers {

    public static function apply_callback( $callback, $form_fields ) {
        if ( ! function_exists( 'jet_engine' ) ) {
            return '';
        }
        
        $callback = str_replace( 'jet-engine-helpers/', '', $callback );
        $params = explode( '/', $callback );

        $callback = $params[0];
        unset( $params[0] );

        if ( ! method_exists( __CLASS__, $callback ) ) {
            return '';
        }

        foreach ( $params as $i => $param ) {
            if ( false === strpos( $param, 'raw:' ) ) {
                $params[ $i ] = $form_fields[ $param ] ?? '';
            } else {
                $params[ $i ] = str_replace( 'raw:', '', $param );
            }
        }

        return call_user_func( array( __CLASS__, $callback ), ...$params );
    }

    public static function get_relation_meta( $relation_id = 0, $meta_key = '', $parent_id = 0, $child_id = 0 ) {
        $relation = jet_engine()->relations->get_active_relations( $relation_id );

        $result = '';

        if ( ! $relation ) {
            return $result;
        }

        $result = $relation->get_meta( $parent_id, $child_id, $meta_key );

        return $result ? $result : '';
    }

}
