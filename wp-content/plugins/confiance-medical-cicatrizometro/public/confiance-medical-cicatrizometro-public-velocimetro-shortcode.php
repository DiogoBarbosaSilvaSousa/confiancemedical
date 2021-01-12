<?php
  
  //Este arquivo deve consistir principalmente em HTML com um pouco de PHP.

	$plugin_url = plugin_dir_url(__FILE__);

	$km_atual = confiance_medical_cicatrizometro_qtd_inicial();
?>

<div id="cicatrizometro-velocimetro">
    <img src="<?php echo confiance_medical_cicatrizometro_veloc_img($km_atual); ?>" alt="Velocímetro">
</div>



