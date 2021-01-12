<?php
defined( 'ABSPATH' ) || exit;

/**
 * Plugin Name: MetForm
 * Plugin URI:  http://products.wpmet.com/metform/
 * Description: Most flexible and design friendly form builder for Elementor
 * Version: 1.3.14
 * Author: Wpmet
 * Author URI:  https://wpmet.com
 * Text Domain: metform
 * License:  GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 */

require_once plugin_dir_path( __FILE__ ) . '/utils/notice/notice.php';
require_once plugin_dir_path( __FILE__ ) . '/utils/banner/init.php';

require_once 'utils/announcements/init.php';
require_once 'utils/pro-awareness/init.php';
require_once 'utils/rating/init.php';

require plugin_dir_path( __FILE__ ) .'autoloader.php';
require plugin_dir_path( __FILE__ ) .'plugin.php';

// init notice class
\Oxaim\Libs\Notice::init();
\Wpmet\Rating\Rating::init();


register_activation_hook( __FILE__, [ MetForm\Plugin::instance(), 'flush_rewrites'] );

add_action( 'plugins_loaded', function(){
    do_action('metform/before_load');
    MetForm\Plugin::instance()->init();
    do_action('metform/after_load');
}, 111);
