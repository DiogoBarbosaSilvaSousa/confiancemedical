<?php

/**
 * Coloque todos os ajudantes da aplicação aqui.
 */


 /**
  * Retorna o valor inicial para o cicatrizômetro
  */
 function confiance_medical_cicatrizometro_qtd_inicial() {

    $posts = get_posts(array(
        'numberposts' => -1,
        'post_type' => 'conf_med_cicatriz',
    ));

    if($posts)
    {
        foreach($posts as $post)
        {
            $valor = get_field('quantidade_inicial',$post->ID);
        }

        return $valor;
    }

 }

/**
 * Retorna o valor dos centímetros que serão acrescentados a cada período de tempo
 */
 function confiance_medical_cicatrizometro_qtd_centimetros() {

    $posts = get_posts(array(
        'numberposts' => -1,
        'post_type' => 'conf_med_cicatriz',
    ));
    

    if($posts)
    {
        foreach($posts as $post)
        {
            $valor = get_field('quantidade_de_centimetros',$post->ID);
        }

        return $valor;
    }

 }

 /**
 * Retorna a data da inserção do da quantidade inicial
 */
function confiance_medical_cicatrizometro_data_de_insercao() {

    $posts = get_posts(array(
        'numberposts' => -1,
        'post_type' => 'conf_med_cicatriz',
    ));
    

    if($posts)
    {
        foreach($posts as $post)
        {
            $valor = get_field('data_de_insercao',$post->ID);
        }

        return $valor;
    }

 }



 /**
  * Atualiza o valor inicial para o cicatrizômetro
  */
  function confiance_medical_cicatrizometro_atualiza_inicio($value) {

    $posts = get_posts(array(
        'numberposts' => -1,
        'post_type' => 'conf_med_cicatriz',
    ));

    if($posts)
    {
        foreach($posts as $post)
        {
            $valor = update_field('quantidade_inicial',$value,$post->ID);
        }

        return $valor;
    }

 }


 /**
 * Atualiza o valor da data de inserção para o cicatrizômetro
 */
function confiance_medical_cicatrizometro_atualiza_insercao($value) {

    $posts = get_posts(array(
        'numberposts' => -1,
        'post_type' => 'conf_med_cicatriz',
    ));
    

    if($posts)
    {
        foreach($posts as $post)
        {
            $valor = update_field('data_de_insercao',$value,$post->ID);
        }

        return $valor;
    }

 }

 /**
  * Atualiza a quantidade inicial
  */
function confiance_medical_cicatrizometro_atualizar() {


    $datetime_1 = date_create($data_atual);
    $datetime_2 = date_create('2022-12-31 23:59:59');

    $interval = date_diff($datetime_1,$datetime_2);
    $dias = $interval->format('%a');
    $horas = $dias * 24;
    $minutos = $horas * 60;
    $segundos = $minutos * 60;

    $data_insercao = confiance_medical_cicatrizometro_data_de_insercao();
    $data_atual = wp_date('Y-m-d H:i:s');

    $segundos = confiance_medical_cicatrizometro_segundos($data_insercao,$data_atual); // diferença entre a data inicial e data atual em segundos


    $km_inicial = confiance_medical_cicatrizometro_qtd_inicial(); // quantidade de cicatrizes evitadas até o momento

    $km_restante = $meta - $km_inicial; // Quilômetros restantes para finalizar a meta

   
    $cm_por_segundo = confiance_medical_cicatrizometro_qtd_centimetros() /100000; // Obtenho a quantidade centímetros por segundo e passo para KM

    $total_cm_avancados = $cm_por_segundo * $segundos; // Múltiplico os centímetros pelo número de segundos

    $km_inicial_atualizado = $km_inicial + $total_cm_avancados; // Somo a quilometragem inicial mais o total de centímetros avançados

    $km_inicial_atualizado = round($km_inicial_atualizado,5); // Arredondo pra 5 casas decimais

    confiance_medical_cicatrizometro_atualiza_inicio($km_inicial_atualizado);
    confiance_medical_cicatrizometro_atualiza_insercao($data_atual);

    return $km_inicial_atualizado ;

}


/**
 * Quantidade de segundos entre duas datas
 */

function confiance_medical_cicatrizometro_segundos($data_1='',$data_2='') {

    if(empty($data_1) || empty($data_2) || ($data_1 >= $data_2)) {
        return 1;
    }

    $datetime_1 = date_create($data_1);
    $datetime_2 = date_create($data_2);

    $interval = date_diff($datetime_1,$datetime_2);
    $dias = $interval->format('%a');
    $horas = $dias * 24;
    $minutos = $horas * 60;
    $segundos = $minutos * 60;

    //Se o dia for igual a zero existe a possibilidade de as datas terem menos de 24 horas de diferença entre elas
    //neste caso tenho que calcular os segundos com base no dia
    if($dias == 0) {
        $time_1 = strtotime($data_1);
        $time_2 = strtotime($data_2);

        $segundos = $time_2 - $time_1;

        //Nunca pode ocorrer do tempo ficar negativo
        if($segundos < 0) { $segundos = 0; }

        return $segundos;
    }


    //Nunca pode ocorrer do tempo ficar negativo
    if($segundos < 0) { $segundos = 0; }

    return $segundos;

}


/**
 * Troca as imagens conforme o estado atual da quantidade inicial de quilômetros
 */
function confiance_medical_cicatrizometro_veloc_img($value) {

    $plugin_url = plugin_dir_url(__FILE__);

    if($value <= 47.3 ) {
        return $plugin_url.'../public/img/velocimetro_0.png';
    }

    if($value <= 87.4 ) {
        return $plugin_url.'../public/img/velocimetro_10.png';
    }

    if($value <= 131.1 ) {
        return $plugin_url.'../public/img/velocimetro_20.png';
    }

    if($value <= 174.8 ) {
        return $plugin_url.'../public/img/velocimetro_30.png';
    }

    if($value <= 218.5 ) {
        return $plugin_url.'../public/img/velocimetro_40.png';
    }

    if($value <= 262.2 ) {
        return $plugin_url.'../public/img/velocimetro_50.png';
    }

    if($value <= 305.9 ) {
        return $plugin_url.'../public/img/velocimetro_60.png';
    }

    if($value <= 349.6 ) {
        return $plugin_url.'../public/img/velocimetro_70.png';
    }

    if($value <= 393.3 ) {
        return $plugin_url.'../public/img/velocimetro_80.png';
    }

    if($value <= 437 ) {
        return $plugin_url.'../public/img/velocimetro_90.png';
    }

    if($value > 437 ) {
        return $plugin_url.'../public/img/velocimetro_90.png';
    }

}