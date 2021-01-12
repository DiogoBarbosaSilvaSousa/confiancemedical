<?php 
namespace MetForm\Controls;

defined( 'ABSPATH' ) || exit;

class Base{

    use \MetForm\Traits\Singleton; 

    // instance of all control's base class
    // ##readhere
    public static function get_url(){
        return \MetForm\Plugin::instance()->plugin_url() . 'controls/';
    }
    public static function get_dir(){
        return \MetForm\Plugin::instance()->plugin_dir() . 'controls/';
    }

    public function init() {

        // Includes necessary files
        $this->include_files();

        // Initilizating control hooks
        add_action('elementor/controls/controls_registered', array( $this, 'formpicker' ), 11 );

        // Initilizating control scripts
        add_action( 'elementor/frontend/after_enqueue_styles', array( $this, 'formpicker_enqueue_styles_editor' ) );
        add_action( 'elementor/frontend/after_enqueue_scripts', array( $this, 'formpicker_enqueue_scripts_editor' ) );

        // Initilizating control classes
        $formpicker_utils = new Form_Picker_Utils();
        $formpicker_utils->init();
    }

    private function include_files(){
        // Controls_Manager
        include_once self::get_dir() . 'control-manager.php';

        // formpicker
        include_once self::get_dir() . 'form-picker-utils.php';
        include_once self::get_dir() . 'form-picker.php';
    }

    public function formpicker( $controls_manager ) {
        $controls_manager->register_control( 'formpicker', new \MetForm\Controls\Form_Picker());
    }
    
	public function formpicker_enqueue_scripts_editor() {
		wp_enqueue_script( 'metform-js-formpicker-control-editor',  self::get_url() . 'assets/js/form-picker-editor.js', [], \MetForm\Plugin::instance()->version() );
    }
    
	public function formpicker_enqueue_styles_editor() {
		wp_enqueue_style( 'metform-css-formpicker-control-editor',  self::get_url() . 'assets/css/form-picker-editor.css', [], '1.0.0' );
    }

}
