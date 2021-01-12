<?php
/**
* Register css styles, javascript files front end
*
* @package ctc
* @since 2.0
*/

if ( ! defined( 'ABSPATH' ) ) exit;

if ( ! class_exists( 'HT_CTC_Scripts' ) ) :

class HT_CTC_Scripts {


    /**
	 * Register styles - front end ( non admin )
	 *
	 * @since 1.0
	 */
    function register_scripts() {

        $ht_ctc_othersettings = get_option('ht_ctc_othersettings');

        // true/false
        $load_app_js_bottom = apply_filters( 'ht_ctc_fh_load_app_js_bottom', true );

        // s7, s8 - fonts - enqueue at style page
        wp_register_style('ht_ctc_font_css', plugins_url( 'new/inc/assets/css/font.css', HT_CTC_PLUGIN_FILE ), '', HT_CTC_VERSION );

        // style-8 - enqueue at style page
        wp_register_style('ht_ctc_mdstyle8_css', plugins_url( 'new/inc/assets/css/mdstyle8.css', HT_CTC_PLUGIN_FILE ) , '', HT_CTC_VERSION );

        // js
        if ('production' == HT_CTC_ENVIRONMENT ) {
            $js = 'app.js';
            $group_js = 'group.js';
            $share_js = 'share.js';
        } else {
            $js = 'dev/app.dev.js';
            $group_js = 'dev/group.dev.js';
            $share_js = 'dev/share.dev.js';
        }

        // app.js for all (chat)
        wp_enqueue_script( 'ht_ctc_app_js', plugins_url( "new/inc/assets/js/$js", HT_CTC_PLUGIN_FILE ), array ( 'jquery' ), HT_CTC_VERSION, $load_app_js_bottom );


        // group.js
        if ( isset ( $ht_ctc_othersettings['enable_group'] ) ) { 
            wp_enqueue_script( 'ht_ctc_group_js', plugins_url( "new/inc/assets/js/$group_js", HT_CTC_PLUGIN_FILE ), array ( 'jquery', 'ht_ctc_app_js' ), HT_CTC_VERSION, $load_app_js_bottom );
        }

        // share.js
        if ( isset ( $ht_ctc_othersettings['enable_share'] ) ) { 
            wp_enqueue_script( 'ht_ctc_share_js', plugins_url( "new/inc/assets/js/$share_js", HT_CTC_PLUGIN_FILE ), array ( 'jquery', 'ht_ctc_app_js' ), HT_CTC_VERSION, $load_app_js_bottom );
        }


    }

}

$ht_ctc_scripts =  new HT_CTC_Scripts();

add_action('wp_enqueue_scripts', array( $ht_ctc_scripts, 'register_scripts' ) );

endif; // END class_exists check