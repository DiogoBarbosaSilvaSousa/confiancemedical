<?php

namespace Wpmet\Rating;

defined('ABSPATH') || exit;


use DateTime;
use Oxaim\Libs\Notice as LibsNotice;

/**
 * Check if notice library exists
 */

$wpmet_metform_util_path = str_replace('rating', '', plugin_dir_path(__FILE__));

$notice_file_path = $wpmet_metform_util_path . 'notice/notice.php';

if (file_exists($notice_file_path)) {
    require_once $notice_file_path;
} else {
    return;
}


if (!class_exists('Wpmet\Rating\Rating')) {

    /**
     * Asking client for rating and
     * other stuffs
     * Class Rating
     * @package MetForm\Utils
     */



    class Rating
    {
        private $plugin_name;
        private $days;
        private $style;
        private $rating_url;
        private $version;
        private $condition_status = true;
        private $text_domain;

        /**
         * scripts version
         *
         * @var string
         */
        protected $script_version = '1.0.0';

        private static $instance;

        /**
         * Method: instance -> Return Notice module class instance
         *
         * @param string|null $text_domain
         * @param string|null $unique_id
         * @return mixed
         */
        public static function instance($text_domain = null, $unique_id = null)
        {
            if ($text_domain == null) {
                return false;
            }

            self::$instance = new self();
            self::$instance->config($text_domain, (is_null($unique_id) ? uniqid() : $unique_id));
            return self::$instance;
        }

        public function config($text_domain, $unique_id)
        {
            $this->text_domain = $text_domain;
        }

        public function get_version()
        {
            return $this->script_version;
        }

        public function get_script_location()
        {
            return __FILE__;
        }

        public function set_plugin($plugin_name,$plugin_url)
        {
            $this->plugin_name = $plugin_name;
            $this->rating_url  = $plugin_url;
            return $this;
        }

        public function set_first_appear_day($days = 7)
        {
            $this->days = $days;
            return $this;
        }

        public function set_rating_url($url)
        {
            $this->rating_url = $url;
            return $this;
        }

        public function add_message_style($style = '')
        {
            $this->style = $style;
            return $this;
        }

        public function set_condition($result)
        {
            switch (gettype($result)) {
                case 'boolean':
                    $this->condition_status = $result;
                    break;
                case 'object':
                    $this->condition_status = $result();
                    break;
                default:
                    $this->condition_status = false;
            }

            return $this;
        }

        public static function init(){
            add_action("wp_ajax_never_show_message", [__CLASS__ , "never_show_message"]);
            add_action("wp_ajax_ask_me_later_message", [__CLASS__ , "ask_me_later_message"]);
        }


        public function call()
        {

            if ($this->condition_status === false) {
                return;
            }

            if (current_user_can('update_plugins')) {
                add_action('admin_footer', [$this, 'scripts'], 9999);

                // add_action("wp_ajax_never_show_message", [$this, "never_show_message"]);
                // add_action("wp_ajax_ask_me_later_message", [$this, "ask_me_later_message"]);


                add_action('wp', [$this, 'cron_activation']);
                add_action($this->plugin_name . '_cronjob', [$this, 'corn_job_func']);


                if ($this->action_on_fire()) {

                    if (!$this->is_installation_date_exists()) {
                        $this->set_installation_date();
                    }

                    if (get_option($this->plugin_name . '_ask_me_later') == 'yes' && get_option($this->plugin_name . '_never_show') != 'yes') {

                        $this->ask_me_later();
                    }

                    if (get_option($this->plugin_name . '_never_show') != 'yes') {

                        if (get_option($this->plugin_name . '_ask_me_later') == 'yes') {
                            return;
                        }

                        $this->is_used_in($this->days);
                    }
                }
            }
            return $this;
        }

        public function cron_activation()
        {
            if (!wp_next_scheduled($this->plugin_name . '_cronjob')) {
                wp_schedule_event(time(), 'daily', $this->plugin_name . '_cronjob');
            }
        }

        private function action_on_fire()
        {
            return true;
        }


        public function set_installation_date()
        {
            add_option($this->plugin_name . '_installDate', date('Y-m-d h:i:s'));
        }

        public function is_installation_date_exists()
        {
            return (get_option($this->plugin_name . '_installDate') == false) ? false : true;
        }

        public function get_installation_date()
        {
            return get_option($this->plugin_name . '_installDate');
        }

        public function set_first_action_date()
        {
            add_option($this->plugin_name . '_first_action_Date', date('Y-m-d h:i:s'));
            add_option($this->plugin_name . '_first_action', 'yes');
        }

        public function get_days($from_date, $to_date)
        {
            return round(($to_date->format('U') - $from_date->format('U')) / (60 * 60 * 24));
        }

        public function is_first_use($in_days)
        {
            $install_date = get_option($this->plugin_name . '_installDate');
            $display_date = date('Y-m-d h:i:s');
            $datetime1 = new DateTime($install_date);
            $datetime2 = new DateTime($display_date);
            $diff_interval = $this->get_days($datetime1, $datetime2);
            if ($diff_interval >= $in_days && get_option($this->plugin_name . '_first_action_Date') == "yes") {

                // action implementation here

            }
        }

        public function is_used_in($days)
        {

            $install_date = get_option($this->plugin_name . '_installDate');
            $display_date = date('Y-m-d h:i:s');
            $datetime1 = new DateTime($install_date);
            $datetime2 = new DateTime($display_date);
            $diff_interval = $this->get_days($datetime1, $datetime2);

            $plugin_name = $this->plugin_name;

            if ($diff_interval >= $days) {


                $message = "Hello! Seems like you have used {$plugin_name} to build this website — Thanks a lot! <br>
Could you please do us a <b>big favor</b> and give it a <b>5-star</b> rating on WordPress? This would boost our motivation and help other users make a comfortable decision while choosing the {$plugin_name}";

                LibsNotice::instance('metform', '_plugin_rating_msg_used_in_day')
                    ->set_dismiss('global', (3600 * 24 * 15))
                    // ->add_id($this->plugin_name . '_plugin_rating_msg_used_in_day')
                    ->set_message($message)
                    ->set_logo('https://ps.w.org/metform/assets/icon-128x128.png', "max-height: 100px")
                    ->set_button([
                        'url' => $this->rating_url,
                        'text' => 'Ok, you deserved it',
                        'class' => 'button-primary',
                        'id' => 'btn_deserved',
                    ])
                    ->set_button([
                        'url' => '#',
                        'text' => 'I already did',
                        'class' => 'button-default',
                        'id' => 'btn_already_did',
                        'icon' => 'dashicons-before dashicons-smiley'
                    ])
                    ->set_button([
                        'url' => 'https://help.wpmet.com/',
                        'text' => 'I need support',
                        'class' => 'button-default',
                        'id' => '#',
                        'icon' => 'dashicons-before dashicons-sos',
                    ])
                    ->set_button([
                        'url' => '#',
                        'text' => 'No, not good enough',
                        'class' => 'button-default',
                        'id' => 'btn_not_good',
                        'icon' => 'dashicons-before dashicons-thumbs-down',
                    ])
                    ->call();

            }
        }


        /**
         * Change the status of Rating notification
         * not to show the message again
         */
        public static function never_show_message()
        {
            $plugin_name = $_POST['plugin_name'];
            add_option($plugin_name . '_never_show', 'yes');
        }


        /**
         *
         * Ask me later functionality
         *
         */
        public function ask_me_later()
        {

            $days = 30;

            $install_date = get_option($this->plugin_name . '_installDate');
            $display_date = date('Y-m-d h:i:s');
            $datetime1 = new DateTime($install_date);
            $datetime2 = new DateTime($display_date);
            $diff_interval = $this->get_days($datetime1, $datetime2);

            $plugin_name = $this->plugin_name;

            if ($diff_interval >= $days) {


                $message = "Hello! Seems like you have used {$plugin_name} to build this website — Thanks a lot! <br>
Could you please do us a <b>big favor</b> and give it a <b>5-star</b> rating on WordPress? This would boost our motivation and help other users make a comfortable decision while choosing the {$plugin_name}";

                LibsNotice::instance('metform', '_plugin_rating_msg_used_in_day')
                    ->set_dismiss('global', (3600 * 24 * 15))
                    // ->add_id($this->plugin_name . '_plugin_rating_msg_used_in_day')
                    ->set_message($message)
                    ->set_logo('https://ps.w.org/metform/assets/icon-128x128.png', "max-height: 100px")
                    ->set_button([
                        'url' => $this->rating_url,
                        'text' => 'Ok, you deserved it',
                        'class' => 'button-primary',
                        'id' => 'btn_deserved',
                    ])
                    ->set_button([
                        'url' => '#',
                        'text' => 'I already did',
                        'class' => 'button-default',
                        'id' => 'btn_already_did',
                        'icon' => 'dashicons-before dashicons-smiley'
                    ])
                    ->set_button([
                        'url' => 'https://help.wpmet.com/',
                        'text' => 'I need support',
                        'class' => 'button-default',
                        'id' => '#',
                        'icon' => 'dashicons-before dashicons-sos',
                    ])
                    ->set_button([
                        'url' => '#',
                        'text' => 'No, not good enough',
                        'class' => 'button-default',
                        'id' => 'btn_not_good',
                        'icon' => 'dashicons-before dashicons-thumbs-down',
                    ])
                    ->call();
            }
        }


        /**
         *
         * When user will click @notGoodEnough button
         * Then it will fire this function to change the status
         * for next asking time
         *
         */


        public static function ask_me_later_message()
        {
            $plugin_name = $_POST['plugin_name'];


            if (get_option($plugin_name . '_ask_me_later') == false) {
                add_option($plugin_name . '_ask_me_later', 'yes');
            } else {
                add_option($plugin_name . '_never_show', 'yes');
            }
        }

        /**
         *
         * Get current version of the plugin
         *
         */

        public function get_current_version()
        {

            return $this->version;
        }

        /**
         *
         * Get previous version of the plugin
         * that have been stored in database
         *
         */


        public function get_previous_version()
        {

            return get_option($this->plugin_name . '_version');
        }

        /**
         *
         *  Set current version of the plugin
         *
         */

        public function set_version($version)
        {

            if (!get_option($this->plugin_name . '_version')) {

                add_option($this->plugin_name . '_version');
            } else {

                update_option($this->plugin_name . '_version', $version);
            }
        }

        /**
         *
         * JS Ajax script for updating
         * rating status from users
         *
         */

        public function scripts()
        {
            echo "
                <script>
                jQuery(document).ready(function ($) {
                    $( '#btn_already_did' ).on( 'click', function() {

                        $.ajax({
                            url: ajaxurl,
                            type: 'POST',
                            data: {
                                action 	: 'never_show_message',
                                plugin_name : '". $this->text_domain ."',

                            },
                            success:function(response){
                                $('#" . $this->text_domain . "-_plugin_rating_msg_used_in_day').remove();

                            }
                        });

                    });

                    $('#btn_deserved').click(function(){
                        $.ajax({
                            url: ajaxurl,
                            type: 'POST',
                            data: {
                                action 	: 'never_show_message',
                                plugin_name : '". $this->text_domain ."',

                            },
                            success:function(response){
                                $('#" . $this->text_domain . "-_plugin_rating_msg_used_in_day').remove();

                            }
                        });
                    });

                    $('#btn_not_good').click(function(){
                        $.ajax({
                            url: ajaxurl,
                            type: 'POST',
                            data: {
                                action 	: 'ask_me_later_message',
                                plugin_name : '". $this->text_domain ."',

                            },
                            success:function(response){
                                $('#" . $this->text_domain . "-_plugin_rating_msg_used_in_day').remove();

                            }
                        });
                    });

                });
                </script>
		";
        }

        /**
         * Cron job activities. Where it will check basic
         * functionality every day.
         *
         */

        public function corn_job_func()
        {

            if ($this->get_current_version() != $this->get_previous_version()) {

                $this->set_version($this->get_current_version());
            }

            if ($this->action_on_fire()) {
                if (get_option($this->plugin_name . '_ask_me_later') == 'yes' && get_option($this->plugin_name . '_never_show') != 'yes') {

                    $this->ask_me_later();
                }

                if (get_option($this->plugin_name . '_never_show') != 'yes') {

                    if (get_option($this->plugin_name . '_ask_me_later') == 'yes') {
                        return;
                    }

                    if (!$this->is_installation_date_exists()) {
                        $this->set_installation_date();
                    }
                    $this->is_used_in($this->days);

                    add_action('admin_footer', [$this, 'scripts'], 9999);
                    add_action("wp_ajax_never_show_message", [$this, "never_show_message"]);
                    add_action("wp_ajax_ask_me_later_message", [$this, "ask_me_later_message"]);
                }
            }
        }
    }
}
