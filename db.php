<?php

/**
 * Database manager class
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Define DB class
 */
class JEC_DB {

	private $table_exists = null;

	public function __construct() {

		add_action( 'init', array( $this, 'install_table' ) );

	}

	public function table_exists() {

		if ( null !== $this->table_exists ) {
			return $this->table_exists;
		}

		$table = self::table();

		if ( $table === self::wpdb()->get_var( "SHOW TABLES LIKE '$table'" ) ) {
			$this->table_exists = true;
		} else {
			$this->table_exists = false;
		}

		return $this->table_exists;
	}

	public function install_table() {

		if ( ! current_user_can( 'manage_options' ) || $this->table_exists() ) {
			return;
		}

		$this->create_table();

	}

	public static function wpdb() {
		global $wpdb;
		return $wpdb;
	}

	public static function table() {
		return self::wpdb()->prefix . 'jec_track_meta';
	}

	public function add_subscription( $post_id, $email, $token ) {

		$data = array(
			'post_id' => $post_id,
			'email'   => $email,
			'token'   => $token,
		);

		$inserted = self::wpdb()->insert( self::table(), $data );

		return $inserted;

	}

	public function delete_subscription( $where ) {

		self::wpdb()->delete( self::table(), $where );

	}

	public function get_subscriptions( $post_id, $email = "%", $token = "%" ) {

		$table = self::table();

		$sql = "SELECT * FROM {$table} WHERE post_id LIKE '{$post_id}' AND email LIKE '{$email}' AND token LIKE '{$token}'";

		$subscriptions = self::wpdb()->get_results( $sql, ARRAY_A );

		if ( empty( $subscriptions ) ) {
			return false;
		}

		return $subscriptions;

	}

	public function create_table() {

		$table = self::table();

		$charset_collate    = self::wpdb()->get_charset_collate();
		$columns_schema     = 'id bigint(20) NOT NULL AUTO_INCREMENT,';
		$columns_schema     .= 'post_id varchar(255),';
		$columns_schema     .= 'email varchar(255),';
		$columns_schema     .= 'token varchar(255),';

		$sql = "CREATE TABLE $table (
			$columns_schema
			PRIMARY KEY (id)
		) $charset_collate;";

		self::wpdb()->query( $sql );

	}

}
