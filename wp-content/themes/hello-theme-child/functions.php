<?php
/**
 * Theme functions and definitions
 *
 * @package HelloElementorChild
 */


define('CONFIANCE_MEDICAL_THEME_VERSION','1.0.0');


/**
 * Load child theme css and optional scripts
 *
 * @return void
 */
function hello_elementor_child_enqueue_scripts() {

	wp_enqueue_style(
		'bootstrap-style',
		get_stylesheet_directory_uri() . '/css/bootstrap.css',
		[
			'hello-elementor',
			'hello-elementor-theme-style',
		],
		CONFIANCE_MEDICAL_THEME_VERSION
	);

	wp_enqueue_style(
		'hello-elementor-child-style',
		get_stylesheet_directory_uri() . '/style.css',
		[
			'hello-elementor',
			'hello-elementor-theme-style',
		],
		CONFIANCE_MEDICAL_THEME_VERSION
	);


	wp_enqueue_script('bootstrap-script', get_stylesheet_directory_uri() . '/js/bootstrap.bundle.min.js', array('jquery'), CONFIANCE_MEDICAL_THEME_VERSION,true);
}
add_action( 'wp_enqueue_scripts', 'hello_elementor_child_enqueue_scripts' );
