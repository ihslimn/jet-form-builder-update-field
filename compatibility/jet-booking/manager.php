<?php

namespace JFB_Update_Field\Compatibility;

use \JFB_Update_Field\Plugin;

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die();
}

class Jet_Booking {

	public function __construct() {
		add_action( 'jet-engine/register-macros', array( $this, 'register_macros' ) );
		add_filter( 'jet-abaf/db/additional-db-columns', array( $this, 'add_apartment_unit_column' ), 999 );
	}

	public function register_macros() {
		require_once Plugin::instance()->plugin_path( 'compatibility/jet-booking/macros/available-units.php' );
		new \JFB_Update_Field\Macros\Available_Units();
	}

	public function add_apartment_unit_column( $columns ) {

		if ( ! is_admin() ) {
			return $columns;
		}

		if ( ! empty( $_GET['post'] ) ) {
			
			$post_type = get_post_type( $_GET['post'] );

			if ( $post_type !== 'jet-form-builder' ) {
				return $columns;
			}

		} elseif ( empty( $_GET['post_type'] ) || $_GET['post_type'] !== 'jet-form-builder' ) {
			return $columns;
		}

		$columns[] = 'apartment_unit';

		return $columns;

	}

}
