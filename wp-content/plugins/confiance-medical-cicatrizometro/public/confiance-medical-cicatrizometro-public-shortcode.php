<?php
  
  //Este arquivo deve consistir principalmente em HTML com um pouco de PHP.

	$plugin_url = plugin_dir_url(__FILE__);
	confiance_medical_cicatrizometro_atualizar(); 

?>

<div id="cicatrizometro-quilometragem">
</div>

<script>
jQuery(function($) {

  let km_inicial = new Number();
  km_inicial = <?php echo confiance_medical_cicatrizometro_qtd_inicial(); ?>;
  cm_por_segundo = <?php echo confiance_medical_cicatrizometro_qtd_centimetros(); ?>;
  //converto para KM 
  cm_por_segundo = cm_por_segundo / 100000;

	function confiance_medical_cicatrizometro(){

		if(km_inicial <= 457) {

			// Cria a variável para formatar no estilo
			km_imprimivel = km_inicial;


			//JQuery pra setar o valor
			$('#cicatrizometro-quilometragem').html(km_imprimivel.toLocaleString('pt-BR', { minimumFractionDigits: 5}) + '<span class="texto-pequeno"> KM</span>');

			// Define que a função será executada novamente em 1000ms = 1 segundo
			setTimeout(confiance_medical_cicatrizometro,1000);

			// diminui o tempo
			km_inicial = km_inicial + cm_por_segundo;

		}

	}

	// Chama a função ao carregar a tela
	confiance_medical_cicatrizometro();

});
</script>



