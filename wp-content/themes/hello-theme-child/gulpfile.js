/**
 * Versão a partir de 19/12/2019
 * Este arquivo contêm a nova forma de montar o arquivo de configuração do gulp
 * o gulpfile.js.
 */

/*
 * Variables (Variáveis)
 */

// Require (Requisições)
const {series, src, dest} = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');

// Sass Bootstrap Source (Código Sass Bootstrap )
const scssBootstrap = './node_modules/bootstrap/scss/bootstrap.scss';

// Sass Source (Código Sass)
const scssFiles = './src/scss/*.scss';

// CSS destination (Destino do CSS)
const cssDest = './css';

// JS destination (Destino do JS)
const jsDest = './js';


// Bootstrap JS (bootstrap.bundle.min.js já vem com o popper.js)
const bootstrap_js = './node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
const bootstrap_js_map = './node_modules/bootstrap/dist/js/bootstrap.bundle.min.js.map';

// Options for development (Opções para o ambiente de desenvolvimento)
const sassDevOptions = {
    outputStyle: 'expanded'
}

// Options for production (Opções para o ambiente de produção)
const sassProdOptions = {
    outputStyle: 'compressed'
}

// Task 'js' - Run with command 'gulp js' (Comando executado com 'gulp js') - Carrego os javascripts
function js(cb){
    src([bootstrap_js,bootstrap_js_map]).pipe(dest(jsDest));
    cb();
}

//atribuo um nome para a função poder ser chamada na linha de comando
exports.js = js;



// Task 'sassbootstrap' - Run with command 'gulp sassbootstrap' (Comando executado com 'gulp sassbootstrap')
function sassbootstrap(cb) {
  src([scssBootstrap])
      .pipe(sass(sassProdOptions).on('error', sass.logError))
      .pipe(dest(cssDest));
  cb();
}

//atribuo um nome para a função poder ser chamada na linha de comando
exports.sassbootstrap = sassbootstrap;


// Task 'sassdev' - Run with command 'gulp sassdev' (Comando executado com 'gulp sassdev')
function sassdev(cb) {
    src([scssFiles])
        .pipe(sass(sassDevOptions).on('error', sass.logError))
        .pipe(rename('confiance-medical.css'))
        .pipe(dest(cssDest));
    cb();
}

//atribuo um nome para a função poder ser chamada na linha de comando
exports.sassdev = sassdev;

// Task 'sassprod' - Run with command 'gulp sassprod' (Comando executado com 'gulp sassprod')
function sassprod(cb) {
      src([scssFiles])
        .pipe(sass(sassProdOptions).on('error', sass.logError))
        .pipe(rename('confiance-medical.min.css'))
        .pipe(dest(cssDest));
      cb();
}

//atribuo um nome para a função poder ser chamada na linha de comando
exports.sassprod = sassprod;

//Executo todas as tasks de uma vez utilizando esta função do gulp exatamente nesta ordem
exports.default = series(js,sassbootstrap,sassdev,sassprod);