<?php

namespace JFB_Update_Field\Macros;

use \JFB_Update_Field\Plugin;

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die();
}

class Appointment_Provider extends \Jet_Engine_Base_Macros {

	public function macros_tag() {
		return 'jfbuf_appointment_provider';
	}

	public function macros_name() {
		return 'JFB Update Field - JetAppointment Provider';
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

		$post_id = Plugin::instance()->storage->get_field_value( $field_name );

		if ( ! $post_id ) {
			return '';
		}

		$post = get_post( $post_id );

		if ( ! $post ) {
			return '';
		}

		$service_id    = $post->ID;
		$services_cpt  = jet_apb()->settings->get( 'services_cpt' );
		$providers_cpt = jet_apb()->settings->get( 'providers_cpt' );

		if ( ! $service_id || ! $services_cpt || ! $providers_cpt ) {
			return '';
		}

		$providers = jet_engine()->relations->get_related_posts( 
			array( 
				'post_type_1' => $services_cpt, 
				'post_type_2' => $providers_cpt, 
				'post_id'     => $service_id, 
				'from'        => $providers_cpt, 
			) 
		);

		if ( ! is_array( $providers ) ) {
			$providers = array( $providers );
		}

		return implode( ',', $providers );

	}
}
