let ambiente = 'hmg'; // Defina ambiente em que está trabalhando

let url_conf_react = ''; // Variável que muda de acordo com o ambiente

if(ambiente == 'dev') { url_conf_react = 'http://dev.confiancemedical.com.br'; }
if(ambiente == 'hmg') { url_conf_react = 'https://www.agenciatitanio.com.br/clientes/confiancemedical'; }
if(ambiente == 'prod') { url_conf_react = 'http://dev.confiancemedical.com.br'; }

export const BASE_URL_CONF_REACT = url_conf_react; // Constante que é exportada
export const BASE_URL_CONF_AJAX = 'wp-admin/admin-ajax.php';