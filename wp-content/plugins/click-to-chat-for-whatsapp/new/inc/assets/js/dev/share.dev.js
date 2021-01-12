// Click to Chat - Share
(function ($) {

var is_mobile = 'yes';
if (typeof screen.width !== "undefined") {
    is_mobile = (screen.width > 1024) ? "no" : "yes";
}

function share_afterdom_loaded() {
    if ('complete' == document.readyState || 'interactive' == document.readyState) {
        // call direclty
        share_ht_ctc();
    } else {
        document.addEventListener('DOMContentLoaded', share_ht_ctc);
    }
}
share_afterdom_loaded();

// function share_ht_ctc_loaded() {
//     share_afterdom_loaded();
// }

function share_ht_ctc() {
    var ht_ctc_share = document.querySelector('.ht-ctc-share');
    if (ht_ctc_share) {
        share_hide_basedon_device(ht_ctc_share);
        ht_ctc_share.addEventListener('click', function () {
            ht_ctc_share_click(ht_ctc_share);
        });
    }

    // ht_ctc_share_sc = document.querySelector('.ht-ctc-sc-share');
    // if (ht_ctc_share_sc) {
    //     ht_ctc_share_sc.addEventListener('click', function () {
    //         ht_ctc_share_sc_click(ht_ctc_share_sc);
    //     });
    // }

    $('.ht-ctc-sc-share').click(function () {
        ht_ctc_share_sc_click(this);
    });


}

// Hide based on device
function share_hide_basedon_device(p) {
    if (is_mobile == 'yes') {
        var display_mobile = p.getAttribute('data-display_mobile');
        if ('show' == display_mobile) {

            // remove desktop style
            var rm = document.querySelector('.ht_ctc_desktop_' + p.getAttribute('data-return_type'));
            (rm) ? rm.remove() : '';

            var css = p.getAttribute('data-css');
            var position_mobile = p.getAttribute('data-position_mobile');
            p.style.cssText = position_mobile + css;
            display(p)
        }
    } else {
        var display_desktop = p.getAttribute('data-display_desktop');
        if ('show' == display_desktop) {

            // remove mobile style
            var rm = document.querySelector('.ht_ctc_mobile_' + p.getAttribute('data-return_type'));
            (rm) ? rm.remove() : '';

            var css = p.getAttribute('data-css');
            var position = p.getAttribute('data-position');
            p.style.cssText = position + css;
            display(p)
        }
    }
}

function display(p) {
    // p.style.display = "block";
    try {
        var dt = parseInt(p.getAttribute('data-show_effect'));
        $(p).show(dt);
    } catch (e) {
        p.style.display = "block";
    }

    // hover effect
    ht_ctc_share_things(p);
}

function ht_ctc_share_things(p) {

    // animations
    var animateclass = p.getAttribute('data-an_type')
    setTimeout(function () {
        p.classList.add('ht_ctc_animation', animateclass);
    }, 120);

    // hover effects
    $(".ht-ctc-share").hover(function () {
        $('.ht-ctc-share .ht-ctc-cta-hover').show(220);
    }, function () {
        $('.ht-ctc-share .ht-ctc-cta-hover').hide(100);
    });
}



// shortcode link
function ht_ctc_share_sc_click(values) {
    
    data_link = values.getAttribute("data-ctc-link");
    data_link = encodeURI(data_link);
    window.open(data_link, '_blank', 'noopener');

    try {
        // (app.js fn)
        ht_ctc_analytics(values);
    } catch(e){}
}

// floating style - click
function ht_ctc_share_click(values) {
    console.log('ht_ctc_share_click');
    // link
    ht_ctc_share_link(values);
    // analytics
    try {
        // (app.js fn)
        ht_ctc_analytics(values);
    } catch(e){}
}

// link - chat, share, group
function ht_ctc_share_link(values) {

    var share_text = values.getAttribute('data-share_text');
    var webandapi = values.getAttribute('data-webandapi');
    // web/api.whatsapp or api.whatsapp
    var share_nav = "api";
    if ('webapi' == webandapi) {
        share_nav = (is_mobile == 'yes') ? "api" : "web";
    }
    var base_link = 'https://' + share_nav + '.whatsapp.com/send';
    window.open(base_link + '?text=' + share_text, '_blank', 'noopener');
    }

})(jQuery);