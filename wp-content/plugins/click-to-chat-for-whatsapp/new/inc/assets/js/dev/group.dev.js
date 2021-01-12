// Click to Chat - Group
(function ($) {

var is_mobile = 'yes';
if (typeof screen.width !== "undefined") {
    is_mobile = (screen.width > 1024) ? "no" : "yes";
}

function group_afterdom_loaded() {
    if ('complete' == document.readyState || 'interactive' == document.readyState) {
        // call direclty
        group_ht_ctc();
    } else {
        document.addEventListener('DOMContentLoaded', group_ht_ctc);
    }
}
group_afterdom_loaded();

// function group_ht_ctc_loaded() {
//     group_afterdom_loaded();
// }

function group_ht_ctc() {
    var ht_ctc_group = document.querySelector('.ht-ctc-group');
    if (ht_ctc_group) {
        group_hide_basedon_device(ht_ctc_group);
        ht_ctc_group.addEventListener('click', function () {
            ht_ctc_group_click(ht_ctc_group);
        });
    }

    // var ht_ctc_group_sc = document.querySelector('.ht-ctc-sc-group');
    // if (ht_ctc_group_sc) {
    //     ht_ctc_group_sc.addEventListener('click', function () {
    //         ht_ctc_group_sc_click(ht_ctc_group_sc);
    //     });
    // }

    $('.ht-ctc-sc-group').click(function () {
        ht_ctc_group_sc_click(this);
    });

}

// Hide based on device
function group_hide_basedon_device(p) {
    if (is_mobile == 'yes') {
        var display_mobile = p.getAttribute('data-display_mobile');
        if ('show' == display_mobile) {

            // remove desktop style
            var rm = document.querySelector('.ht_ctc_desktop_' + p.getAttribute('data-return_type'));
            (rm) ? rm.remove() : '';

            var css = p.getAttribute('data-css');
            var position_mobile = p.getAttribute('data-position_mobile');
            p.style.cssText = position_mobile + css;
            group_display(p)
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
            group_display(p)
        }
    }
}

function group_display(p) {
    // p.style.display = "block";
    try {
        var dt = parseInt(p.getAttribute('data-show_effect'));
        $(p).show(dt);
    } catch (e) {
        p.style.display = "block";
    }

    // hover effect
    ht_ctc_group_things(p);
}

function ht_ctc_group_things(p) {

    // animations
    var animateclass = p.getAttribute('data-an_type')
    setTimeout(function () {
        p.classList.add('ht_ctc_animation', animateclass);
    }, 120);

    // hover effects
    $(".ht-ctc-group").hover(function () {
        $('.ht-ctc-group .ht-ctc-cta-hover').show(220);
    }, function () {
        $('.ht-ctc-group .ht-ctc-cta-hover').hide(100);
    });
}

// group shortcode link
function ht_ctc_group_sc_click(values) {
    
    data_link = values.getAttribute("data-ctc-link");
    data_link = encodeURI(data_link);
    window.open(data_link, '_blank', 'noopener');

    try {
        // (app.js fn)
        ht_ctc_analytics(values);
    } catch (e) { }
}

// group floating style - click
function ht_ctc_group_click(values) {
    // link
    ht_ctc_group_link(values);

    // analytics 
    try {
        // (app.js fn)
        ht_ctc_analytics(values);
    } catch(e){}
}

// link - chat, share, group
function ht_ctc_group_link(values) {

    var base_link = 'https://chat.whatsapp.com/';
    var group_id = values.getAttribute('data-group_id');
    window.open(base_link + group_id, '_blank', 'noopener');
}

})(jQuery);