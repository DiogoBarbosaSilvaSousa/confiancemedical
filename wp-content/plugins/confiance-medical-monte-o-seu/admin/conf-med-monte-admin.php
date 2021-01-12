<?php

//Registro todos os scripts do admin 
function conf_med_monte_admin_scripts(){

    // adiciona css 
    wp_enqueue_style('conf-med-monte-admin-style',plugin_dir_url( __FILE__ ) . 'css/conf-med-monte-admin.css', array(), CONF_MED_MONTE_VERSION, 'all' );

    // adiciona javascript
    wp_enqueue_script('conf-med-monte-admin-script',plugin_dir_url( __FILE__ ) . 'js/conf-med-monte-admin.js', array( 'jquery' ), CONF_MED_MONTE_VERSION, false );

}
add_action('admin_wp_enqueue_scripts','conf_med_monte_admin_scripts');// Adiciono ao wordpress os scripts para serem inseridos na ordem certa.


//Registro de  Custom Post Type conf_med_monte
function custom_post_type_conf_med_monte () {

    $labels = array(
        'name'                  => _x( 'Confiance Medical Monte o Seu', 'Post Type General Name', 'text_domain' ),
        'singular_name'         => _x( 'Confiance Medical Monte o Seu', 'Post Type Singular Name', 'text_domain' ),
        'menu_name'             => __( 'Confiance Medical Monte o Seu', 'text_domain' ),
        'name_admin_bar'        => __( 'Confiance Medical Monte o Seu', 'text_domain' ),
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
        'slug'                  => 'conf-med-monte',
    );
    $args = array(
        'label'                 => __( 'Confiance Medical Monte o Seu', 'text_domain' ),
        'description'           => __( 'Confiance Medical Monte o Seu', 'text_domain' ),
        'labels'                => $labels,
        'supports'              => array( 'title'),
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
        'menu_icon'             => 'dashicons-edit'
    );

    //O nome do post type não pode conter mais do que 20 caracteres caso possua mais ocorrerá erro ou não será registrado
    register_post_type( 'conf_med_monte', $args );

}
add_action( 'init', 'custom_post_type_conf_med_monte', 0 );

/** 
 * Colunas do novo custom_post_type_conf_med_monte()
 * Dados vêm do plugin Advanced Custom Fields
 */
function set_custom_edit_conf_med_monte_columns($columns) {

    $columnsNew = [];

    $columnsNew = [
        'cb' => $columns['cb'],
        'title' => $columns['title'],
        'equipamento' => 'Equipamento',
        'modelo' => 'Modelo',
        'tipo' => 'Tipo',
        'date' => $columns['date']
    ];

    return $columnsNew;
}
add_filter( 'manage_conf_med_monte_posts_columns','set_custom_edit_conf_med_monte_columns' );


// A forma que cada dado da coluna será exibido
function custom_conf_med_monte_column( $column, $post_id ) {
    switch ( $column ) {
        case 'equipamento' :
        case 'modelo' :
        case 'tipo' :
            echo get_field($column, $post_id);
            break;
    }
}
add_action( 'manage_conf_med_monte_posts_custom_column','custom_conf_med_monte_column', 12, 2 );



/**
 * listo e organizo todos os equipamentos em um array do php
 * Também destaco para quais sistemas serve
 */
function conf_med_monte_equipamentos() {

  $query = new WP_Query(array(
    'post_type' => 'conf_med_monte',
    'post_status' => 'publish',
    'posts_per_page' => -1,
    'fields' => 'ids',
    'orderby' => 'modified',
    'order'   => 'DESC',
  ));

  $equipamentos_disponiveis = array();

  $posts = $query->posts;
  foreach ($posts as $post_id) {

    $item_equipamento = array();

    $equipamento = get_field('equipamento',$post_id);
    $modelo = get_field('modelo',$post_id);
    $tipo = get_field('tipo',$post_id);
    $imagem = get_field('imagem',$post_id);
    $descricao = get_field('descricao',$post_id);
    $sistemas = get_field('sistemas',$post_id);
    $imagem_opcao = get_field('imagem_opcao',$post_id);
    $texto_opcao = get_field('texto_opcao',$post_id);
    $subtexto_opcao = get_field('subtexto_opcao',$post_id);
    $ordenacao_opcao = get_field('ordenacao_opcao',$post_id);
    $exibe_opcao = get_field('exibe_opcao',$post_id);


    $item_equipamento['equipamento'] = $equipamento;
    $item_equipamento['modelo'] = $modelo;
    $item_equipamento['tipo'] = $tipo;
    $item_equipamento['imagem'] = $imagem;
    $item_equipamento['descricao'] = $descricao;
    $item_equipamento['sistemas'] = $sistemas;
    $item_equipamento['imagem_opcao'] = $imagem_opcao;
    $item_equipamento['texto_opcao'] = $texto_opcao;
    $item_equipamento['subtexto_opcao'] = $subtexto_opcao;
    $item_equipamento['ordenacao_opcao'] = $ordenacao_opcao;
    $item_equipamento['exibe_opcao'] = $exibe_opcao;


    $item_equipamento['sistema_1'] = false;
    $item_equipamento['sistema_2'] = false;
    $item_equipamento['sistema_3'] = false;
    $item_equipamento['sistema_4'] = false;
    $item_equipamento['sistema_5'] = false;


    foreach($sistemas as $key => $value){

        if($value == 1) { $item_equipamento['sistema_1'] = true; }
        if($value == 2) { $item_equipamento['sistema_2'] = true; }
        if($value == 3) { $item_equipamento['sistema_3'] = true; }
        if($value == 4) { $item_equipamento['sistema_4'] = true; }
        if($value == 5) { $item_equipamento['sistema_5'] = true; }

    }

    array_push($equipamentos_disponiveis,$item_equipamento);

  }

  return $equipamentos_disponiveis;

}


/**
 * listo todos os equipamentos em um JSON
 */
 function conf_med_monte_listar_equipamentos() {


   $equipamentos_disponiveis = conf_med_monte_equipamentos();

   conf_med_json($equipamentos_disponiveis);

}

add_action( 'wp_ajax_listar_equipamentos','conf_med_monte_listar_equipamentos');
add_action( 'wp_ajax_nopriv_listar_equipamentos','conf_med_monte_listar_equipamentos');



/**
 * listo todos os sistemas basicamente percorro todos os equipamentos cadastrados
 * e o adiciono ao seu respectivo sistema no array. Atualmente temos 5 tipos  de
 * sugestões de sistemas.
 */
 function conf_med_monte_listar_sistemas() {

      $equipamentos_disponiveis = conf_med_monte_equipamentos();
      $sistema = array();

      foreach ($equipamentos_disponiveis as $equipamento) {


        if($equipamento['sistema_1']) {

           $sistema[1]['sistema'] = "Sistema 1";

          if($equipamento['equipamento'] == 'monitor') { 
            $sistema[1]['monitor'] =  $equipamento['modelo']; 
            $sistema[1]['imagem_monitor'] =  $equipamento['imagem'];
            $sistema[1]['tipo_monitor'] =  $equipamento['tipo']; }

          if($equipamento['equipamento'] == 'insuflador') { 
            $sistema[1]['insuflador'] =  $equipamento['modelo']; 
            $sistema[1]['imagem_insuflador'] =  $equipamento['imagem']; }

          if($equipamento['equipamento'] == 'camera') { 
            $sistema[1]['camera'] =  $equipamento['modelo']; 
            $sistema[1]['imagem_camera'] =  $equipamento['imagem'];
            $sistema[1]['tipo_camera'] =  $equipamento['tipo'];}

          if($equipamento['equipamento'] == 'luz') { 
            $sistema[1]['luz'] =  $equipamento['modelo']; 
            $sistema[1]['imagem_luz'] =  $equipamento['imagem']; }

          if($equipamento['equipamento'] == 'gravador') { 
            $sistema[1]['gravador'] =  $equipamento['modelo']; 
            $sistema[1]['imagem_gravador'] =  $equipamento['imagem'];}

          if($equipamento['equipamento'] == 'armario') { 
            $sistema[1]['armario'] =  $equipamento['modelo']; 
            $sistema[1]['imagem_armario'] =  $equipamento['imagem']; }

          if($equipamento['equipamento'] == 'acessorios') { $sistema[1]['acessorios'] .=  $equipamento['modelo'] . ' + '; }

        }

        if($equipamento['sistema_2']) {

           $sistema[2]['sistema'] = "Sistema 2"; 

          if($equipamento['equipamento'] == 'monitor') { 
             $sistema[2]['monitor'] =  $equipamento['modelo']; 
             $sistema[2]['imagem_monitor'] =  $equipamento['imagem'];
             $sistema[2]['tipo_monitor'] =  $equipamento['tipo']; }

          if($equipamento['equipamento'] == 'insuflador') { 
             $sistema[2]['insuflador'] =  $equipamento['modelo']; 
             $sistema[2]['imagem_insuflador'] =  $equipamento['imagem'];}

          if($equipamento['equipamento'] == 'camera') { 
             $sistema[2]['camera'] =  $equipamento['modelo']; 
             $sistema[2]['imagem_camera'] =  $equipamento['imagem'];
             $sistema[2]['tipo_camera'] =  $equipamento['tipo'];}

          if($equipamento['equipamento'] == 'luz') { 
             $sistema[2]['luz'] =  $equipamento['modelo']; 
             $sistema[2]['imagem_luz'] =  $equipamento['imagem'];}

          if($equipamento['equipamento'] == 'gravador') { 
             $sistema[2]['gravador'] =  $equipamento['modelo']; 
             $sistema[2]['imagem_gravador'] =  $equipamento['imagem'];}

          if($equipamento['equipamento'] == 'armario') { 
             $sistema[2]['armario'] =  $equipamento['modelo']; 
             $sistema[2]['imagem_armario'] =  $equipamento['imagem'];}

          if($equipamento['equipamento'] == 'acessorios') { 
            $sistema[2]['acessorios'] .=  $equipamento['modelo'] . ' + '; }

        }

        if($equipamento['sistema_3']) {

           $sistema[3]['sistema'] = "Sistema 3";

          if($equipamento['equipamento'] == 'monitor') { 
             $sistema[3]['monitor'] =  $equipamento['modelo']; 
             $sistema[3]['imagem_monitor'] =  $equipamento['imagem']; 
             $sistema[3]['tipo_monitor'] =  $equipamento['tipo']; }

          if($equipamento['equipamento'] == 'insuflador') { 
             $sistema[3]['insuflador'] =  $equipamento['modelo']; 
             $sistema[3]['imagem_insuflador'] =  $equipamento['imagem'];}

          if($equipamento['equipamento'] == 'camera') { 
             $sistema[3]['camera'] =  $equipamento['modelo']; 
             $sistema[3]['imagem_camera'] =  $equipamento['imagem'];
             $sistema[3]['tipo_camera'] =  $equipamento['tipo'];}

          if($equipamento['equipamento'] == 'luz') { 
             $sistema[3]['luz'] =  $equipamento['modelo']; 
             $sistema[3]['imagem_luz'] =  $equipamento['imagem'];}

          if($equipamento['equipamento'] == 'gravador') { 
             $sistema[3]['gravador'] =  $equipamento['modelo']; 
             $sistema[3]['imagem_gravador'] =  $equipamento['imagem'];}

          if($equipamento['equipamento'] == 'armario') { 
             $sistema[3]['armario'] =  $equipamento['modelo']; 
             $sistema[3]['imagem_armario'] =  $equipamento['imagem'];}

          if($equipamento['equipamento'] == 'acessorios') { 
            $sistema[3]['acessorios'] .=  $equipamento['modelo'] . ' + '; }
        }

        if($equipamento['sistema_4']) {

           $sistema[4]['sistema'] = "Sistema 4";

          if($equipamento['equipamento'] == 'monitor') { 
             $sistema[4]['monitor'] =  $equipamento['modelo']; 
             $sistema[4]['imagem_monitor'] =  $equipamento['imagem']; 
             $sistema[4]['tipo_monitor'] =  $equipamento['tipo']; }

          if($equipamento['equipamento'] == 'insuflador') { 
             $sistema[4]['insuflador'] =  $equipamento['modelo']; 
             $sistema[4]['imagem_insuflador'] =  $equipamento['imagem'];}

          if($equipamento['equipamento'] == 'camera') { 
             $sistema[4]['camera'] =  $equipamento['modelo']; 
             $sistema[4]['imagem_camera'] =  $equipamento['imagem'];
             $sistema[4]['tipo_camera'] =  $equipamento['tipo'];}

          if($equipamento['equipamento'] == 'luz') { 
             $sistema[4]['luz'] =  $equipamento['modelo']; 
             $sistema[4]['imagem_luz'] =  $equipamento['imagem'];}

          if($equipamento['equipamento'] == 'gravador') { 
             $sistema[4]['gravador'] =  $equipamento['modelo']; 
             $sistema[4]['imagem_gravador'] =  $equipamento['imagem'];}

          if($equipamento['equipamento'] == 'armario') { 
             $sistema[4]['armario'] =  $equipamento['modelo']; 
             $sistema[4]['imagem_armario'] =  $equipamento['imagem'];}

          if($equipamento['equipamento'] == 'acessorios') { 
            $sistema[4]['acessorios'] .=  $equipamento['modelo'] . ' + '; }

        }

        if($equipamento['sistema_5']) {

            $sistema[5]['sistema'] = "Sistema 5";

          if($equipamento['equipamento'] == 'monitor') { 
             $sistema[5]['monitor'] =  $equipamento['modelo']; 
             $sistema[5]['imagem_monitor'] =  $equipamento['imagem']; 
             $sistema[5]['tipo_monitor'] =  $equipamento['tipo']; }

          if($equipamento['equipamento'] == 'insuflador') { 
             $sistema[5]['insuflador'] =  $equipamento['modelo']; 
             $sistema[5]['imagem_insuflador'] =  $equipamento['imagem'];}

          if($equipamento['equipamento'] == 'camera') { 
             $sistema[5]['camera'] =  $equipamento['modelo']; 
             $sistema[5]['imagem_camera'] =  $equipamento['imagem'];
             $sistema[5]['tipo_camera'] =  $equipamento['tipo'];}

          if($equipamento['equipamento'] == 'luz') { 
             $sistema[5]['luz'] =  $equipamento['modelo']; 
             $sistema[5]['imagem_luz'] =  $equipamento['imagem'];}

          if($equipamento['equipamento'] == 'gravador') { 
             $sistema[5]['gravador'] =  $equipamento['modelo']; 
             $sistema[5]['imagem_gravador'] =  $equipamento['imagem'];}

          if($equipamento['equipamento'] == 'armario') { 
             $sistema[5]['armario'] =  $equipamento['modelo']; 
             $sistema[5]['imagem_armario'] =  $equipamento['imagem'];}

          if($equipamento['equipamento'] == 'acessorios') { 
            $sistema[5]['acessorios'] .=  $equipamento['modelo'] . ' + '; }

        }

      }


      conf_med_json($sistema);
      //conf_med_json($equipamentos_disponiveis[1]['sistema_1']);

}

add_action( 'wp_ajax_listar_sistemas','conf_med_monte_listar_sistemas');
add_action( 'wp_ajax_nopriv_listar_sistemas','conf_med_monte_listar_sistemas');



/**
 * Listo todos os monitores e faço a ordenação.
 */
function conf_med_monte_listar_monitores() {

   $equipamentos_disponiveis = conf_med_monte_equipamentos();
   $monitores = array();

   foreach ($equipamentos_disponiveis as $equipamento) {

      $monitor_disponivel = array();

      if($equipamento['equipamento'] == 'monitor') { 
            $monitor_disponivel['equipamento'] = $equipamento['equipamento'];
            $monitor_disponivel['modelo'] = $equipamento['modelo'];
            $monitor_disponivel['tipo'] = $equipamento['tipo'];
            $monitor_disponivel['imagem'] = $equipamento['imagem'];
            $monitor_disponivel['descricao'] = $equipamento['descricao'];
            $monitor_disponivel['sistemas'] = $equipamento['sistemas'];
            $monitor_disponivel['imagem_opcao'] = $equipamento['imagem_opcao'];
            $monitor_disponivel['texto_opcao'] = $equipamento['texto_opcao'];
            $monitor_disponivel['subtexto_opcao'] = $equipamento['subtexto_opcao'];
            $monitor_disponivel['ordenacao_opcao'] = $equipamento['ordenacao_opcao'];
            $monitor_disponivel['exibe_opcao'] = $equipamento['exibe_opcao'];

            array_push($monitores,$monitor_disponivel);
      }

   }

   // Obtain a list of columns
   foreach ($monitores  as $key => $row) {
      $ordenacao_opcao[$key]  = $row['ordenacao_opcao'];
   }

  // Ordena os dados por ordenacao_opcao crescente.
  // Adiciona $monitores como último parâmetro, para ordenar por uma chave comum.
  array_multisort($ordenacao_opcao, SORT_ASC, $monitores);


  conf_med_json($monitores);

}

add_action( 'wp_ajax_listar_monitores','conf_med_monte_listar_monitores');
add_action( 'wp_ajax_nopriv_listar_monitores','conf_med_monte_listar_monitores');


/**
 * Listo todas as opções baaseadas no tipo de equipamento e faço a ordenação.
 */
function conf_med_monte_listar_opcoes() {

   $opcao_equipamento = $_GET['equipamento'];

   $equipamentos_disponiveis = conf_med_monte_equipamentos();
   $opcoes = array();

   foreach ($equipamentos_disponiveis as $equipamento) {

      $opcao_disponivel = array();

      if($equipamento['equipamento'] == $opcao_equipamento) { 
            $opcao_disponivel['equipamento'] = $equipamento['equipamento'];
            $opcao_disponivel['modelo'] = $equipamento['modelo'];
            $opcao_disponivel['tipo'] = $equipamento['tipo'];
            $opcao_disponivel['imagem'] = $equipamento['imagem'];
            $opcao_disponivel['descricao'] = $equipamento['descricao'];
            $opcao_disponivel['sistemas'] = $equipamento['sistemas'];
            $opcao_disponivel['imagem_opcao'] = $equipamento['imagem_opcao'];
            $opcao_disponivel['texto_opcao'] = $equipamento['texto_opcao'];
            $opcao_disponivel['subtexto_opcao'] = $equipamento['subtexto_opcao'];
            $opcao_disponivel['ordenacao_opcao'] = $equipamento['ordenacao_opcao'];
            $opcao_disponivel['exibe_opcao'] = $equipamento['exibe_opcao'];

            array_push($opcoes,$opcao_disponivel);
      }

   }

   // Obtain a list of columns
   foreach ($opcoes  as $key => $row) {
      $ordenacao_opcao[$key]  = $row['ordenacao_opcao'];
   }

  // Ordena os dados por ordenacao_opcao crescente.
  // Adiciona $opcoes como último parâmetro, para ordenar por uma chave comum.
  array_multisort($ordenacao_opcao, SORT_ASC, $opcoes);

  conf_med_json($opcoes);

}

add_action( 'wp_ajax_listar_opcoes','conf_med_monte_listar_opcoes');
add_action( 'wp_ajax_nopriv_listar_opcoes','conf_med_monte_listar_opcoes');