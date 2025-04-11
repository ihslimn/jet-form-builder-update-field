<?php
/**
 * Plugin Name: JetFormBuilder - Update Fields
 * Plugin URI:
 * Description: 
 * Version:     1.2.8
 * Author:      
 * Author URI:  
 * Text Domain: 
 * License:     GPL-3.0+
 * License URI: http://www.gnu.org/licenses/gpl-3.0.txt
 * Domain Path: /languages
 */

namespace JFB_Update_Field;

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die();
}

if ( ! class_exists( '\JFB_Update_Field\Plugin' ) ) {

	class Plugin {

		private $path = null;

		private static $instance = null;

		public $db = null;

		public $storage = null;

		private $version = '1.2.8';

		public function __construct() {
			add_action( 'plugins_loaded', array( $this, 'jec_init' ) );
		}

		public function get_version() {
			return $this->version;
		}

		public function plugin_path( $path = '' ) {
			
			if ( ! $this->path ) {
				$this->path = trailingslashit( plugin_dir_path( __FILE__ ) );
			}

			return $this->path . $path;

		}

		public function jec_init() {

			if ( ! function_exists( 'jet_form_builder' ) ) {

				add_action( 'admin_notices', function() {
					$class = 'notice notice-error';
					$message = '<b>WARNING!</b> <b>JetFormBuilder - Update Fields</b> plugin requires <b>JetFormBuilder</b> plugin to be installed and activated.';
					printf( '<div class="%1$s"><p>%2$s</p></div>', esc_attr( $class ), wp_kses_post( $message ) );
				} );

				return;

			}

			// it can work only on JetFormBuilder >=3.1.0
			if ( ! function_exists( 'jet_fb_context' ) ) {

				add_action( 'admin_notices', function() {
					$class = 'notice notice-error';
					$message = '<b>WARNING!</b> <b>JetFormBuilder - Update Fields</b> plugin requires <b>JetFormBuilder</b> plugin to be updated to version 3.1+.';
					printf( '<div class="%1$s"><p>%2$s</p></div>', esc_attr( $class ), wp_kses_post( $message ) );
				} );

				return;

			}

			add_action( 'after_setup_theme', array( $this, 'init_components' ), 0 );

		}

		public function init_components() {

			$this->path = trailingslashit( plugin_dir_path( __FILE__ ) );

			require $this->plugin_path( 'rest-api/jet-engine-helpers.php' );

			require $this->plugin_path( 'rest-api/endpoint.php' );
			new Endpoint();

			require $this->plugin_path( 'additional-block-attributes.php' );
			new Additional_Block_Attributes();

			require $this->plugin_path( 'storage.php' );
			$this->storage = new Storage();

			require $this->plugin_path( 'compatibility/manager.php' );
			new Compatibility\Compatibility_Manager();

			require $this->plugin_path( 'blocks/manager.php' );
			new Blocks();

			add_action( 'enqueue_block_editor_assets', array( $this, 'block_assets' ), -100 );

			add_filter( 'jet-form-builder/frontend-settings', array( $this, 'enable_strict_mode' ) );

			add_action( 'jet-engine/register-macros', array( $this, 'register_macros' ) );

		}

		public function register_macros() {

			require_once $this->plugin_path( 'macros/form-field-value.php' );
			new Macros\Form_Field_Value();

		}

		public function enable_strict_mode( $settings ) {

			$settings['strict_mode'] = true;

			return $settings;

		}

		public function block_assets() {

			wp_enqueue_script(
				'jfb-update-field',
				plugins_url( 'assets/js/blocks.js', __FILE__ ),
				array( 'wp-components', 'wp-element', 'wp-blocks', 'wp-block-editor', 'wp-edit-post' ),
				$this->get_version(),
				false
			);

		}

		public static function instance() {
		
			if ( is_null( self::$instance ) ) {
				self::$instance = new self();
			}

			return self::$instance;
		}

	}

}

Plugin::instance();
