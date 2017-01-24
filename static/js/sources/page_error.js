$(document).ready(function () {

    // Add the missing url to the text
    var param = getParameterByName('p');
    if (param) {
        $("#url").text(param);
    }

    var raf = requestAnimationFrame || mozRequestAnimationFrame ||
        webkitRequestAnimationFrame || msRequestAnimationFrame;
    if (raf) {
        raf(function () {
            $("img.lazy").lazyload({
                threshold: 500
            });
        });
    }

    function getParameterByName(name, url) {
        if (!url) {
            url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }


    var $error = $('#error'),
        h = window.innerHeight - 280;
    // height fixer
    $error.css('min-height', h + 'px');
});