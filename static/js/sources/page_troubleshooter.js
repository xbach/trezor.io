$(document).ready(function () {

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

    function loadById(id) {
        var $newModel = $( ".model" ).clone();
        $newModel.find('.header').html(items[id].title);
        $newModel.find('.text').html(items[id].contents);
        $newModel.addClass('next');
        $newModel.removeClass('hidden model');
        $newModel.prependTo( "#content" );
        $(".current").removeClass('current').addClass('prev');
        $newModel.removeClass('next').addClass('current');
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

    var items = [];
    var id = getParameterByName('id') || 0;

    $.getJSON( "../static/js/cards.json", function( data ) {
        setTimeout(function(){
            items = data;
            loadById(id)
        }, 2000);
    });


});