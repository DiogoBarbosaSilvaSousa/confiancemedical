<?php

/**
  * O arquivo de inicialização do plug-in
  *
  * Este arquivo é lido pelo WordPress para gerar as informações do plugin.
  * área de administração. Este arquivo também inclui todas as dependências usadas pelo plug-in,
  * registra as funções de ativação e desativação e define uma função
  * que inicia o plugin.
 *
 * @link              https://agenciatitanio.com.br/
 * @since             1.0.0
 * @package           Anbraz
 *
 * @wordpress-plugin
 * Plugin Name:       Confiance Medical Cicatrizômetro
 * Plugin URI:        https://agenciatitanio.com.br/
 * Description:       Exibição da quantidade de cicatrizes evitadas.
 * Version:           1.0.0
 * Author:            Agência Titânio
 * Author URI:        https://agenciatitanio.com.br/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       confiance-medical-cicatrizometro
 */

// Se esse arquivo for chamado diretamente, aborte.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Versão atual do plugin.
 * Comece na versão 1.0.0 e use SemVer - https://semver.org
 * Renomeie isso para o seu plug-in e atualize-o conforme você libera novas versões.
 */
define( 'CONFIANCE_MEDICAL_CICATRIZOMETRO_VERSION', '1.0.0' );


/**
 * Url base do site
 */
define('WP_CONFIANCE_MEDICAL_CICATRIZOMETRO_URL_HTTP','http://www.example.com.br');
define('WP_CONFIANCE_MEDICAL_CICATRIZOMETRO_URL_HTTPS','https://www.example.com.br');

//date_default_timezone_set('America/Sao_Paulo');

//require_once(__DIR__ . '/vendor/autoload.php'); // Autoload do composer

require_once(__DIR__ .'/include/confiance-medical-cicatrizometro-helper.php');

require_once(__DIR__ .'/admin/confiance-medical-cicatrizometro-admin.php');

require_once(__DIR__ .'/public/confiance-medical-cicatrizometro-public.php');