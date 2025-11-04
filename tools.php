<?php

namespace JFB_Update_Field;

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die();
}

class Tools {

	public static function is_options_empty( $options ) {
		if ( empty( $options ) ) {
			return true;
		}

		if ( count( $options ) > 2 ) {
			return false;
		}

		$keys = array_column( $options, 'value', 'value' );
		return isset( $keys['_jfbuf_empty1'] ) && isset( $keys['_jfbuf_empty2'] );
	}

}
