$(document).ready(function () {

    function getParameterByName() {
       return window.location.hash.split('#')[1];
    }

    function prepareLinks() {
        entries.forEach(function(entry) {
            var list = entry.content.querySelectorAll('div.content-wrapper > ul.option-list > li');
            list.forEach(function(child) {
                var id = child.textContent.toString();
                var elem = shadow.querySelector("[id='"+id+"']").content;
                var title = elem.querySelector("h4.header").textContent;
                var newNode = '<a href="./#'+ id + '">' + title + '</a>';
                child.innerHTML = newNode;
            });

        });
    }

    function setId() {
        try {
            var id = getParameterByName() || 0;
            var elem = shadow.querySelector("[id='"+id+"']").cloneNode(true);
            $(".back-btn").hide();
            $(".back-btn").detach().appendTo("#scene");
            $(".current").remove();
            $( "#content" ).append( elem.content );
            setTimeout(function(){
                $("ul#content > .content-wrapper").addClass("current");
                $("html, body").animate({ scrollTop: 0 }, "fast");
                if(id !== 0) {
                    setTimeout(function(){
                        $(".back-btn").detach().appendTo(".content-wrapper > span.text");
                        $(".back-btn").slideDown();
                    }, 900);
                }
            }, 10);
        } catch (e) {
            throw e;
        }
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

    var shadow = document.querySelector("#shadow");
    var entries = shadow.querySelectorAll("template.entry");
    var h = window.innerHeight;
    $('#troubleshooter').css('min-height', h - 170 + 'px');
    prepareLinks();
    setId();
    window.onhashchange = setId;
});