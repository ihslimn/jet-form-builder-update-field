<?php

namespace JFB_Update_Field;

use \JFB_Update_Field\Plugin;

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die();
}

class Blocks {

	public function __construct() {
		add_action( 'jet-form-builder/submit-field/on-register', array( $this,'register_type') );
	}

	public function register_type( $buttons ) {

		require_once Plugin::instance()->plugin_path( 'blocks/button-type.php' );;

		$buttons->set_button_type( new \Jet_Form_Builder\Blocks\Button_Types\Button_Update() );

	}

}
