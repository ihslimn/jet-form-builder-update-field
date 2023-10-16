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

		add_filter( 'jet-engine/listings/macros-list', array( $this, 'add_custom_macro_args' ), 999 );
		add_filter( 'jet-engine/relations/sources-list', array( $this, 'add_custom_macro_sources' ) );
		add_filter( 'jet-engine/relations/object-id-by-source/jfbuf_field', array( $this, 'apply_relation_macro_source'), 10, 2 );

		if ( function_exists( 'jet_apb' ) ) {
			require_once Plugin::instance()->plugin_path( 'compatibility/jet-appointment/manager.php' );
			new \JFB_Update_Field\Compatibility\Jet_Appointment();
		}

		if ( function_exists( 'jet_abaf' ) ) {
			require_once Plugin::instance()->plugin_path( 'compatibility/jet-booking/manager.php' );
			new \JFB_Update_Field\Compatibility\Jet_Booking();
		}

	}

	public function add_custom_macro_args( $macros ) {

		foreach ( $macros as $key => $macro ) {
		
			if ( ! empty( $macro['args']['rel_object_var']['condition']['rel_object_from'] ) ) {
				$macros[ $key ]['args']['rel_object_var']['condition']['rel_object_from'][] = 'jfbuf_field';
			}
			
		}
		
		return $macros;

	}

	public function add_custom_macro_sources( $sources ) {

		$sources['jfbuf_field'] = 'JFB Update Field - Form field';
	
		return $sources;

	}

	public function apply_relation_macro_source( $object_id, $form_field = '' ) {

		if ( empty( $form_field ) ) {
			return false;
		}
		
		$object_id = \JFB_Update_Field\Plugin::instance()->storage->get_field_value( $form_field );
		
		return $object_id;

	}

}