<?php
/**
 * As configurações básicas do WordPress
 *
 * O script de criação wp-config.php usa esse arquivo durante a instalação.
 * Você não precisa usar o site, você pode copiar este arquivo
 * para "wp-config.php" e preencher os valores.
 *
 * Este arquivo contém as seguintes configurações:
 *
 * * Configurações do MySQL
 * * Chaves secretas
 * * Prefixo do banco de dados
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Configurações do MySQL - Você pode pegar estas informações com o serviço de hospedagem ** //
/** O nome do banco de dados do WordPress */
define( 'DB_NAME', 'db_confiance' );

/** Usuário do banco de dados MySQL */
define( 'DB_USER', 'homestead' );

/** Senha do banco de dados MySQL */
define( 'DB_PASSWORD', 'secret' );

/** Nome do host do MySQL */
define( 'DB_HOST', 'localhost' );

/** Charset do banco de dados a ser usado na criação das tabelas. */
define( 'DB_CHARSET', 'utf8mb4' );

/** O tipo de Collate do banco de dados. Não altere isso se tiver dúvidas. */
define( 'DB_COLLATE', '' );

/**#@+
 * Chaves únicas de autenticação e salts.
 *
 * Altere cada chave para um frase única!
 * Você pode gerá-las
 * usando o {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org
 * secret-key service}
 * Você pode alterá-las a qualquer momento para invalidar quaisquer
 * cookies existentes. Isto irá forçar todos os
 * usuários a fazerem login novamente.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '>ap{eq<j!X+97ksm(>-}v`q5?$)!b0b8iEzDl&@a]}~(,a=/QG-Lz&}P&|yRErPc' );
define( 'SECURE_AUTH_KEY',  'X!B/bvjP8N$,gD!J*V|vl+w{yM7ku)3-kF8k+:]lOSou<TfU[aa?Nfdl3;4E2-Ml' );
define( 'LOGGED_IN_KEY',    'i&l/R[+{vmJLL&Ck9h*xwooPKDv+&{nOa v-9n)drqA;*qt( ^]JMQ Myy8a2UcH' );
define( 'NONCE_KEY',        '~!xrN1z%<0?)gdF<->0fJ G&HN.Dn)1 3Bx7MC><HRQe3,sZ0cKY7gQ}tijo?C@v' );
define( 'AUTH_SALT',        'o%I^i_hiK.svf&wThFs6Gklf>9yV+~lk~i$8[VGq#<)_PW>r0$bM(=s5tRb.;xJM' );
define( 'SECURE_AUTH_SALT', 'b!Fo| Z!=E{dtI>l<nlSE/kil%s7/2HI1kA(hkR+o:R=b#Qsq?[&w_ii(Fa{:s^h' );
define( 'LOGGED_IN_SALT',   '_Gp5YDZn)l)H /0z_Q)uAc]JHxItj;M`Fw1lDTm1@bq.qhSfxkWjw2mu-l2&i,iy' );
define( 'NONCE_SALT',       'oRlJF#{?B/(:eRwJ}p.[9W+Ba&o?F+{kMrAPc<}BF*QDKJlB>|k{Cq[kY~$#1KN)' );

/**#@-*/

/**
 * Prefixo da tabela do banco de dados do WordPress.
 *
 * Você pode ter várias instalações em um único banco de dados se você der
 * um prefixo único para cada um. Somente números, letras e sublinhados!
 */
$table_prefix = 'wp_';

/**
 * Para desenvolvedores: Modo de debug do WordPress.
 *
 * Altere isto para true para ativar a exibição de avisos
 * durante o desenvolvimento. É altamente recomendável que os
 * desenvolvedores de plugins e temas usem o WP_DEBUG
 * em seus ambientes de desenvolvimento.
 *
 * Para informações sobre outras constantes que podem ser utilizadas
 * para depuração, visite o Codex.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Isto é tudo, pode parar de editar! :) */

/** Caminho absoluto para o diretório WordPress. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Configura as variáveis e arquivos do WordPress. */
require_once ABSPATH . 'wp-settings.php';
