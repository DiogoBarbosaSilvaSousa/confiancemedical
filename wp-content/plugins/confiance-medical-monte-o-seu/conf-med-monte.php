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
 * @package           ConfMedMonte
 *
 * @wordpress-plugin
 * Plugin Name:       Confiance Medical - Monte o seu
 * Plugin URI:        https://agenciatitanio.com.br/
 * Description:       Este Plugin serve para o cliente montar a configuração do equipamento cirúgico que será mandado o orçamento.
 * Version:           1.0.0
 * Author:            Agência Titânio
 * Author URI:        https://agenciatitanio.com.br/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       conf-med-monte
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
define( 'CONF_MED_MONTE_VERSION', '1.0.0' );


/**
 * Url base do site
 */
define('CONF_MED_MONTE_URL_HTTP',site_url());


/**
 * Constantes javascripts para o plugin
 */
function conf_med_monte_constantes_js() {
  ?>
  <!--  Constantes Javascript  -->
  <script>
        const CONF_MED_MONTE_PUBLIC_SITE_URL = '<?php echo site_url() ;?>'; // Endereço base do site
        const CONF_MED_MONTE_ADMIN_SITE_URL = '<?php echo admin_url() ;?>'; // Endereço base do site (administração)
        const CONF_MED_MONTE_BASE_AJAX_URL = '<?php echo site_url() ;?>/wp-admin/admin-ajax.php'; // Endereço base do Wordpress para consultas com AJAX
        const CONF_MED_MONTE_PLUGIN_URL = '<?php echo plugin_dir_url(__FILE__); ?>';
   </script>
  <!--  Constantes Javascript  -->
  <?php
}

add_action('wp_head','conf_med_monte_constantes_js', 20);

//require_once(__DIR__ . '/vendor/autoload.php'); // Autoload do composer

require_once(__DIR__ .'/includes/conf-med-monte-helper.php');

require_once(__DIR__ .'/admin/conf-med-monte-admin.php');

require_once(__DIR__ .'/public/conf-med-monte-public.php');