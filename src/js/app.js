import { initSearch } from './search';

var cb = cb || {};

cb.initApp = function () {
    var $body = $(document.body);
    
    // Initialize Pagefind search
    new PagefindUI({ 
        element: "#search",
        showImages: true,
        showSubResults: false,
        resetStyles: false,
        addStyles: false,
        autofocus: true,
        showClear: false,
        bundlePath: "/pagefind/",
        resultTemplate: (result) => {
            return `
                <div class="pagefind-ui__result-thumb">
                    <img class="pagefind-ui__result-image" src="${result.meta.image}" alt="${result.meta.title || 'Recipe'}" />
                </div>
                <div class="pagefind-ui__result-inner">
                    <p class="pagefind-ui__result-title">
                        <a class="pagefind-ui__result-link" href="${result.url}">${result.meta.title || 'Recipe'}</a>
                    </p>
                    <p class="pagefind-ui__result-excerpt">${result.meta.description || result.excerpt}</p>
                    ${result.meta.info ? `<p class="pagefind-ui__result-info">${result.meta.info}</p>` : ''}
                </div>
            `;
        },
        excludeUrls: [
            "/article/privacy-policy/",
            "/article/terms-of-service/",
            "/article/about/",
            "/article/credits/"
        ],
        processTerm: (term) => {
            // Remove any special characters that might affect search
            return term.trim();
        },
        preProcessResults: (results) => {
            // Deduplicate results based on URL
            const seen = new Set();
            return results.filter(result => {
                const url = result.url.replace('/amp/', '/');
                if (seen.has(url)) {
                    return false;
                }
                seen.add(url);
                return true;
            });
        },
        processResult: (result) => {
            // Get the first sentence of the excerpt
            const firstSentence = result.excerpt?.split('.')?.[0] || '';
            
            // Extract cooking time if available
            const timeMatch = result.excerpt?.match(/(\d+)\s*minutes/);
            const cookingTime = timeMatch ? timeMatch[1] + ' minutes' : '';
            
            // Extract ingredients count if available
            const ingredientsMatch = result.excerpt?.match(/(\d+)\s*Ingredients/);
            const ingredientsCount = ingredientsMatch ? ingredientsMatch[1] + ' ingredients' : '';
            
            // Build info string
            const info = [cookingTime, ingredientsCount].filter(Boolean).join(' • ');

            // Get metadata from the result
            const meta = result.meta || {};
            const title = meta.title || result.meta?.recipe || result.meta?.name || 'Recipe';
            
            // Fix the URL to remove amp
            const url = (result.url || '').replace('/amp/', '/');
            
            return {
                meta: {
                    ...meta,
                    title: title
                },
                url: url,
                excerpt: firstSentence,
                info: info
            };
        }
    });

    // Handle search result clicks
    $body.off('click', '.pagefind-ui__result');
    $body.on('click', '.pagefind-ui__result', function(e) {
        if (!$(e.target).is('a')) {
            const link = $(this).find('.pagefind-ui__result-link').attr('href');
            if (link) {
                window.location.href = link;
            }
        }
    });

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
