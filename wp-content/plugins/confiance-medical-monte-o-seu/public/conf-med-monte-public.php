<?php

/**
 * Registro todos os scripts do public que serão necessários para o funcionamento do meu shortcode_plugin-name_orcamento 
 */
function conf_med_monte_public_scripts(){

    global $post;

    if( is_a( $post, 'WP_Post' ) && has_shortcode( $post->post_content, 'conf-med-monte') ) {

        $plugin_url = plugin_dir_url( __FILE__ );

        // adiciona css do bootstrap
        wp_enqueue_style('conf-med-monte-public-style', $plugin_url . 'css/conf-med-monte-public.css',array(), CONF_MED_MONTE_VERSION, 'all');

        // adiciona javascript
        wp_enqueue_script('conf-med-monte-public-script', $plugin_url . 'js/conf-med-monte-public.js', array('jquery'), CONF_MED_MONTE_VERSION,true);
        
        // adiciona bundle gerado parao o ReactJS
        wp_enqueue_script('bundle-conf-med.js', $plugin_url . 'js/bundle-conf-med.js', array(), CONF_MED_MONTE_VERSION,true);
    
    }

}
add_action( 'wp_enqueue_scripts', 'conf_med_monte_public_scripts');

// crio shortcode com o formulário para orçamento
function shortcode_conf_med_monte(){

    //atribuo todo o conteúdo do arquivo para a váriavel e a uso como retorno.
    ob_start();
        require_once(plugin_dir_path( __FILE__ ).'conf-med-monte-public-shortcode.php');
        $html = ob_get_contents();
    ob_get_clean();

    return $html;
}
add_shortcode( 'conf-med-monte', 'shortcode_conf_med_monte' );