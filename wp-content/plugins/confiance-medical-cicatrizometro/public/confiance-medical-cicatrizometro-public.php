<?php

/**
 * Registro todos os scripts do public que serão necessários para o funcionamento do meu shortcode__orcamento 
 */
function confiance_medical_cicatrizometro_public_scripts(){

    global $post;

    if( is_a( $post, 'WP_Post' ) && has_shortcode( $post->post_content, 'confiance_medical_cicatrizometro') ) {

    $plugin_url = plugin_dir_url( __FILE__ );

    // adiciona css
    wp_enqueue_style('confiance-medical-cicatrizometro-public-style', $plugin_url . 'css/confiance-medical-cicatrizometro-public.css',array(), CONFIANCE_MEDICAL_CICATRIZOMETRO_VERSION, 'all');

    // adiciona javascript
    wp_enqueue_script('confiance-medical-cicatrizometro-public-script', $plugin_url . 'js/confiance-medical-cicatrizometro-public.js', array('jquery'), CONFIANCE_MEDICAL_CICATRIZOMETRO_VERSION,true);
   

    }



}
add_action( 'wp_enqueue_scripts', 'confiance_medical_cicatrizometro_public_scripts');

// crio shortcode com o formulário para orçamento
function shortcode_confiance_medical_cicatrizometro(){

    //atribuo todo o conteúdo do arquivo para a váriavel e a uso como retorno.
    ob_start();
        require_once(plugin_dir_path( __FILE__ ).'confiance-medical-cicatrizometro-public-shortcode.php');
        $html = ob_get_contents();
    ob_get_clean();

    return $html;
}
add_shortcode( 'confiance_medical_cicatrizometro', 'shortcode_confiance_medical_cicatrizometro' );


// crio shortcode com o desenho do velocímetro
function shortcode_confiance_medical_cicatrizometro_veloc(){

    //atribuo todo o conteúdo do arquivo para a váriavel e a uso como retorno.
    ob_start();
        require_once(plugin_dir_path( __FILE__ ).'confiance-medical-cicatrizometro-public-velocimetro-shortcode.php');
        $html = ob_get_contents();
    ob_get_clean();

    return $html;
}
add_shortcode( 'confiance_medical_cicatriz_veloc', 'shortcode_confiance_medical_cicatrizometro_veloc' );