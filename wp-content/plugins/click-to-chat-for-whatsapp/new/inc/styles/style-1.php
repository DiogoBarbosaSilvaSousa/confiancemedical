<?php
/**
 * Style - 1
 * 
 * theme button
 * 
 */

if ( ! defined( 'ABSPATH' ) ) exit;

$s1_options = get_option( 'ht_ctc_s1' );
$s1_options = apply_filters( 'ht_ctc_fh_s1_options', $s1_options );

$s1_fullwidth_css = "";

if ( '' == $call_to_action ) {
    $call_to_action = "WhatsApp us";
}

if ( isset( $s1_options['s1_m_fullwidth'] ) ) {
  $s1_fullwidth_css = "@media(max-width:1201px){.ht-ctc.style-1{left:unset !important;right:0px !important;}.ht-ctc.style-1,.ht-ctc .s1_btn{width:100%;}}";

?>
<style id="ht-ctc-s1"><?php echo $s1_fullwidth_css ?></style>
<?php
}

?>
<button class="ctc-analytics s1_btn"><?php echo $call_to_action ?></button>