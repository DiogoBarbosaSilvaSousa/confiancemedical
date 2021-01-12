import axios from 'axios';
import * as Constante from '../Constantes.js';

const url_conf_ajax_axios = Constante.BASE_URL_CONF_REACT + '/' + Constante.BASE_URL_CONF_AJAX;
//http://dev.confiancemedical.com.br/wp-admin/admin-ajax.php

const api = axios.create({
    baseURL: url_conf_ajax_axios
});

export default api;