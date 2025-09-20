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
    });

    $(".w-scroll").niceScroll({
        cursorcolor: "rgba(0,0,0,0.2)",
        cursorwidth: "5px"
    });
};

$(document).ready(function () {
    cb.initApp();

    $("div.navbar-fixed-top").autoHidingNavbar();

});
