<?php

namespace JFB_Update_Field\Macros;

use \JFB_Update_Field\Plugin;

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die();
}

class Available_Units extends \Jet_Engine_Base_Macros {

	public function macros_tag() {
		return 'jfbuf_available_units';
	}

	public function macros_name() {
		return 'JFB Update Field - JetBooking Available Units';
	}

	public function macros_args() {
		return array(
			'_date_field'    => array(
				'label'   => 'Date field name',
				'type'    => 'text',
				'default' => '',
			),
			'_post_field'    => array(
				'label'   => 'Apartment ID field name',
				'type'    => 'text',
				'default' => '',
			),
		);
	}

	public function macros_callback( $args = array() ) {

		$date_field = ! empty( $args['_date_field'] ) ? $args['_date_field'] : null;
		$post_field = ! empty( $args['_post_field'] ) ? $args['_post_field'] : null;

		if ( ! $date_field || ! $post_field ) {
			return '';
		}

		$bounds = ( array ) Plugin::instance()->storage->get_field_value( $date_field . '_jfbuf_timestamp_array' );
		
		if ( empty( $bounds ) ) {
			return '';
		}

		$apartment_id = Plugin::instance()->storage->get_field_value( $post_field );
		
		if ( ! $apartment_id ) {
			return '';
		}

		$in  = $bounds['start'] ?? false;
		$out = $bounds['end'] ?? false;

		if ( ! $in || ! $out ) {
			return '';
		}

		$booking = array(
			'apartment_id'   => $apartment_id,
			'check_in_date'  => $in,
			'check_out_date' => $out,
		);

		$available_units = jet_abaf()->db->get_available_units( $booking );

		if ( empty( $available_units ) ) {
			return '';
		}
		
		return implode( ',', array_column( $available_units, 'unit_id' ) );

	}
}
