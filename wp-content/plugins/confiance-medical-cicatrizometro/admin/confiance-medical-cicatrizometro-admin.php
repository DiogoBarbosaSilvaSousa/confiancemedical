<?php

//Registro todos os scripts do admin 
function confiance_medical_cicatrizometro_admin_scripts(){

    // adiciona css 
    wp_enqueue_style('confiance-medical-cicatrizometro-admin-style',plugin_dir_url( __FILE__ ) . 'css/confiance-medical-cicatrizometro-admin.css', array(), CONFIANCE_MEDICAL_CICATRIZOMETRO_VERSION, 'all' );

    // adiciona javascript
    wp_enqueue_script('confiance-medical-cicatrizometro-admin-script',plugin_dir_url( __FILE__ ) . 'js/confiance-medical-cicatrizometro-admin.js', array( 'jquery' ), CONFIANCE_MEDICAL_CICATRIZOMETRO_VERSION, false );

}
add_action('admin_wp_enqueue_scripts','confiance_medical_cicatrizometro_admin_scripts');// Adiciono ao wordpress os scripts para serem inseridos na ordem certa.


//Registro de  Custom Post Type confiance_medical_cicatrizometro
function custom_post_type_confiance_medical_cicatrizometro() {

    $labels = array(
        'name'                  => _x( 'Confiance Medical Cicatrizômetro', 'Post Type General Name', 'text_domain' ),
        'singular_name'         => _x( 'Confiance Medical Cicatrizômetro', 'Post Type Singular Name', 'text_domain' ),
        'menu_name'             => __( 'Confiance Medical Cicatrizômetro', 'text_domain' ),
        'name_admin_bar'        => __( 'Confiance Medical Cicatrizômetro', 'text_domain' ),
        'all_items'             => __( 'Todos', 'text_domain' ),
        'add_new'               => __( 'Novo', 'text_domain' ),
        'new_item'              => __( 'Novo item', 'text_domain' ),
        'edit_item'             => __( 'Editar Item', 'text_domain' ),
        'update_item'           => __( 'Atualizar', 'text_domain' ),
        'view_item'             => __( 'Ver', 'text_domain' ),
        'view_items'            => __( 'Ver item', 'text_domain' ),
        'search_items'          => __( 'Buscar item', 'text_domain' ),
        'not_found'             => __( 'Não encontrado', 'text_domain' ),
        'not_found_in_trash'    => __( 'Não encontrado na lixeira', 'text_domain' ),
    );
    $rewrite = array(
        'slug'                  => 'confiance-medical-cicatrizometro',
    );
    $args = array(
        'label'                 => __( 'Confiance Medical Cicatrizômetro', 'text_domain' ),
        'description'           => __( 'Confiance Medical Cicatrizômetro', 'text_domain' ),
        'labels'                => $labels,
        'supports'              => array('none' ),
        'hierarchical'          => false,
        'public'                => true,
        'show_ui'               => true,
        'show_in_menu'          => true,
        'menu_position'         => 5,
        'show_in_admin_bar'     => true,
        'show_in_nav_menus'     => true,
        'can_export'            => true,
        'has_archive'           => true,
        'exclude_from_search'   => false,
        'publicly_queryable'    => true,
        'rewrite'               => $rewrite,
        'capability_type'       => 'page',
        'menu_icon'				=> 'dashicons-cart'
    );

    register_post_type( 'conf_med_cicatriz', $args );

}
add_action( 'init', 'custom_post_type_confiance_medical_cicatrizometro', 0 );


/** 
 * Colunas do novo custom_post_type_confiance_medical_cicatrizometro()
 * Dados vêm do plugin Advanced Custom Fields
 */
function set_custom_edit_conf_med_cicatriz_columns($columns) {

    $columnsNew = [];

    $columnsNew = [
        'cb' => $columns['cb'],
        'quantidade_inicial' => 'Quantidade Inicial (Km)',
        'quantidade_de_centimetros' => 'Quantidade de centímetros (Por segundo)',
        'data_de_insercao' => 'Data de inserção',
        'date' => $columns['date']
    ];

    return $columnsNew;
}
add_filter( 'manage_conf_med_cicatriz_posts_columns','set_custom_edit_conf_med_cicatriz_columns' );


// A forma que cada dado da coluna será exibido
function custom_conf_med_cicatriz_column( $column, $post_id ) {
    switch ( $column ) {
        case 'quantidade_inicial' :
            echo get_field('quantidade_inicial', $post_id);
            break;
        case 'quantidade_de_centimetros' :
            echo get_field('quantidade_de_centimetros', $post_id);
            break;
        case 'data_de_insercao' :
            echo get_field('data_de_insercao', $post_id);
            break;
    }
}
add_action( 'manage_conf_med_cicatriz_posts_custom_column','custom_conf_med_cicatriz_column', 10, 2 );