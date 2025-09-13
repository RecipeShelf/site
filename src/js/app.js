var cb = cb || {};

cb.initApp = function () {
    var $body = $(document.body);

    $body.off('click', '.step-track-icon, .step-text');
    $body.on('click', '.step-track-icon, .step-text', function (e) {
        var $step = $(this).closest('li').find('.step-track-icon');
        var unchecked = $step.hasClass('fa-square-o');
        var found = false;
        var $icons = $(this).closest('.details').find('.step-track-icon');
        $icons.each(function () {
            if ($(this).is($step)) {
                found = true;
            }
            if (unchecked) {
                if (!found || $(this).is($step)) {
                    $(this).removeClass('fa-square-o');
                    $(this).addClass('fa-check-square-o');
                }
            }
            else {
                if (found) {
                    $(this).removeClass('fa-check-square-o');
                    $(this).addClass('fa-square-o');
                }
            }
        });
        $(this).closest('.details').find('.step-selected-text').removeClass('step-selected-text');
        $icons.filter('.fa-square-o').first().siblings().addClass('step-selected-text');
        var index = $icons.index($step);
        amplitude.logEvent("Recipe Step Selected", { recipe: $(this).closest('.widget').find('.name').text(), stepIndex: index, stepPercent: Math.round(((index + 1) * 100) / $icons.length) + '%' });
    });

    $(".w-scroll").niceScroll({
        cursorcolor: "rgba(0,0,0,0.2)",
        cursorwidth: "5px"
    });
  
    $body.off('click', '.shareByFacebook');
    $body.on('click', '.shareByFacebook', function (e) {
        amplitude.logEvent("Share by Facebook Clicked", { recipe: $(this).closest('.widget').find('.name').text() });
        var url = $(this).closest('.shareByFacebook').data('href');
        FB.ui({
            method: 'share',
            href: url
        }, function (response) { });
    });

    $body.off('click', '.shareByPinterest');
    $body.on('click', '.shareByPinterest', function (e) {
        amplitude.logEvent("Share by Pintereset Clicked", { recipe: $(this).closest('.widget').find('.name').text() });
        var $btn = $(this).closest('.shareByPinterest');
        var url = $btn.data('href');
        var image_url = $btn.data('image-url');
        PDK.pin(image_url, '', url, function (response) { });
    });
};

$(document).ready(function () {
    cb.initApp();

    $("div.navbar-fixed-top").autoHidingNavbar();

    amplitude.logEvent("Page Opened", { page: window.location.href });
});
