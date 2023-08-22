<?php

namespace JFB_Update_Field\Compatibility;

use \JFB_Update_Field\Plugin;

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die();
}

class Compatibility_Manager {

	public function __construct() {
		$this->jet_engine_related();
	}

	public function jet_engine_related() {

		if ( ! function_exists( 'jet_engine' ) ) {
			return;
		}

		if ( function_exists( 'jet_apb' ) ) {
			require_once Plugin::instance()->plugin_path( 'compatibility/jet-appointment/manager.php' );
			new \JFB_Update_Field\Compatibility\Jet_Appointment();
		}

		if ( function_exists( 'jet_abaf' ) ) {
			require_once Plugin::instance()->plugin_path( 'compatibility/jet-booking/manager.php' );
			new \JFB_Update_Field\Compatibility\Jet_Booking();
		}

	}

}