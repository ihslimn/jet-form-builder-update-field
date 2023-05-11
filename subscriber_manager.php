<?php

class JEC_Subscriber_Manager {
	
	public function __construct() {
	
		add_action( 'init', array( $this, 'unsubscribe_by_email' ) );

		add_action( 'wp_ajax_jec_mt_unsubscribe', array( $this, 'unsubscribe_by_click' ) );
		add_action( 'wp_ajax_nopriv_jec_mt_unsubscribe', array( $this, 'unsubscribe_by_click' ) );

		add_action( 'jet-form-builder/custom-action/jec-subscribe', array( $this, 'subscribe' ) );

	}

	private function generate_token( $post_id, $email ) {
		return md5( $post_id . $email );
	}

	public function unsubscribe_by_click() {

		$post_id = $_REQUEST['postid'] ?? false;
		$email   = $_COOKIE['jec-customer-email'];

		if ( ! $post_id || ! $email ) {
			return;
		}

		JEC_Track_Meta_Change::instance()->db->delete_subscription( array( 'post_id' => $post_id, 'email' => $email ) );

		wp_send_json_success();

	}

	public function unsubscribe_by_email() {

		$token = $_GET['jec_unsubscribe'] ?? false;

		if ( ! $token ) {
			return;
		}

		JEC_Track_Meta_Change::instance()->db->delete_subscription( array( 'token' => $token ) );

	}

	public function subscribe( $request ) {
		
		$post_id = $request['post_id'] ?? false;
		$email   = $request['email_field'];

		if ( ! $post_id || ! $email ) {
			return;
		}

		if ( ! empty( JEC_Track_Meta_Change::instance()->db->get_subscriptions( $post_id, $email ) ) ) {
			return;
		}

		setcookie( 'jec-customer-email', 
			$email, 
			0,
			COOKIEPATH ? COOKIEPATH : '/',
			COOKIE_DOMAIN,
			$secure,
			true );

		$token = $this->generate_token( $post_id, $email );

		JEC_Track_Meta_Change::instance()->db->add_subscription( $post_id, $email, $token );

	}

}