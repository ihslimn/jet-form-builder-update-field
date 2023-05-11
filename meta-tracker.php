<?php

class JEC_Meta_Track {

	private $options = array();

	private $old_value = null;

	private $post_type = '';

	private $skip = true;

	private $email_list = array();
	
	public function __construct() {

		$this->options = get_option( 'jec-track-options' );

		if ( empty( $this->options ) ) {
			return;
		}

		add_action( 'update_post_meta', array( $this, 'maybe_track_old_value' ), 0, 3 );
		add_action( 'updated_post_meta', array( $this, 'send_email' ), 0, 4 );

		add_filter( 'jet-form-builder/render/text-field', array( $this, 'set_email_as_default' ) );

	}

	public function set_email_as_default( $args ) {

		$email = $_COOKIE['jec-customer-email'] ?? '';

		$args['default'] = str_replace( '{jec_subscription_email}', $email, $args['default'] );

		return $args;

	}

	public function get_email_list( $post_id ) {

		if ( ! empty( $this->email_list ) ) {
			return $this->email_list;
		}

		$subscriptions = JEC_Track_Meta_Change::instance()->db->get_subscriptions( $post_id );

		if ( empty( $subscriptions ) ) {
			$this->email_list = array();
			return $this->email_list;
		}

		$this->email_list = array_column( $subscriptions, 'email' );

		return $this->email_list;

	}

	public function maybe_track_old_value( $meta_id, $post_id, $meta_key ) {

		$options = $this->options;

		if ( $meta_key !== $options['field_key'] || empty( $this->get_email_list( $post_id ) ) ) {
			$this->skip = true;
			return;
		}

		$this->post_types = explode( ',', $options['post_types'] );

		$post_type = get_post_type( $post_id );

		if ( ! in_array( $post_type, $this->post_types ) ) {
			$this->skip = true;
			return;
		} else {
			$this->skip = false;
		}

		if ( false !== strpos( $options['email_format'], '{old_value}' ) ) {
			$this->old_value = get_post_meta( $post_id, $meta_key, true );
		}

	}

	public function get_token( $post_id, $email ) {

		$subscriptions = JEC_Track_Meta_Change::instance()->db->get_subscriptions( $post_id, $email );

		if ( empty( $subscriptions ) ) {
			return false;
		}

		return $subscriptions[0]['token'];

	}

	public function send_email( $meta_id, $post_id, $meta_key, $meta_value ) {

		if ( $this->skip ) {
			return;
		}

		$email_list = $this->get_email_list( $post_id );

		if ( empty( $email_list ) ) {
			return;
		}

		$from = get_option( 'admin_email' );

		$headers  = "From: {$from} <{$from}>\r\n";
		$headers .= "Content-Type: text/html; charset=utf-8\r\n";

		foreach ( $email_list as $email ) {
			$unsubscribe_url = add_query_arg( array( 'jec_unsubscribe' => $this->get_token( $post_id, $email ) ), get_site_url() );
			$email_content = $this->options['email_format'];
			$email_content = str_replace( '{old_value}', $this->old_value, $email_content );
			$email_content = str_replace( '{new_value}', $meta_value, $email_content );
			$email_content = str_replace( '{post_name}', get_post( $post_id )->post_title, $email_content );
			$email_content = str_replace( '{post_url}', get_permalink( $post_id ), $email_content );
			$email_content   = str_replace( '{unsubscribe_url}', $unsubscribe_url, $email_content );
			wp_mail( $email, 'Price change', $email_content, $headers );
		}
		
	}

}