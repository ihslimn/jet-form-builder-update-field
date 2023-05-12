<?php

namespace JFB_Update_Field;

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die();
}

class Get_Field_Endpoint {

	/**
	 * Returns route name
	 *
	 * @return string
	 */
	public function get_name() {
		return 'get-field';
	}

	/**
	 * API callback
	 *
	 * @return void
	 */
	public function callback( $request ) {

		$params = $request->get_params();
		$instance = ! empty( $params['instance'] ) ? $params['instance'] : false;

		if ( ! $instance ) {
			return rest_ensure_response( array(
				'success' => false,
				'message' => __( 'Item instance should be specified in request to correctly attach callbacks', 'jet-engine' ),
			) );
		}

		$res = apply_filters( 'jet-engine/rest-api/add-item/' . $instance, false, $params, $this );

		if ( ! $res ) {
			return rest_ensure_response( array(
				'success' => false,
				'message' => __( 'Callback not attached properly or success was not thrown during callback', 'jet-engine' ),
			) );
		}

		return $res;

	}

	/**
	 * Returns endpoint request method - GET/POST/PUT/DELTE
	 *
	 * @return string
	 */
	public function get_method() {
		return 'POST';
	}

	/**
	 * Check user access to current end-popint
	 *
	 * @return bool
	 */
	public function permission_callback( $request ) {
		return true;
	}

}
