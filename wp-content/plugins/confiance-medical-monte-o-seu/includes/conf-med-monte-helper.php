<?php

/**
 * Coloque todos os ajudantes da aplicação aqui.
 */


 /**
 * Ajusto o retorno do array para json e o encerro
 */

 function conf_med_json($array_to_json){

    header('Content-Type: application/json; charset=UTF-8');
    print_r(json_encode($array_to_json,JSON_UNESCAPED_UNICODE));
    wp_die();

 }