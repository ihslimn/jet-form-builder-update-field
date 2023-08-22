<?php

namespace JFB_Update_Field\Compatibility;

use \JFB_Update_Field\Plugin;

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die();
}

class Jet_Appointment {

    public function __construct() {
        add_action( 'jet-engine/register-macros', array( $this, 'register_macros' ) );
    }

    public function register_macros() {
        require_once Plugin::instance()->plugin_path( 'compatibility/jet-appointment/macros/appointment-provider.php' );
		new \JFB_Update_Field\Macros\Appointment_Provider();
    }

}