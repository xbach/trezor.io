$(document).ready(function () {

    function stickyToggle(sticky, stickyWrapper, scrollElement) {
        var stickyHeight = sticky.outerHeight();
        var stickyTop = stickyWrapper.offset().top;
        if (scrollElement.scrollTop() >= stickyTop) {
            stickyWrapper.height(stickyHeight);
            sticky.addClass("is-sticky");
        } else {
            sticky.removeClass("is-sticky");
            stickyWrapper.height('auto');
        }
    }

    function onScroll(event){
        var scrollPos = $(document).scrollTop();
        $('#sub-nav a.scrollTo').each(function () {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            if (refElement.position().top - 64 <= scrollPos && refElement.position().top  - 64 + refElement.height() > scrollPos) {
                $('#sub-nav a.scrollTo').removeClass("active");
                currLink.addClass("active");
            }
            else{
                currLink.removeClass("active");
            }
        });
    }

    $('[data-toggle="sticky-onscroll"]').each(function () {
        var sticky = $(this);
        var stickyWrapper = $('<div>').addClass('sticky-wrapper');
        sticky.before(stickyWrapper);
        sticky.addClass('sticky');

        $(window).on('scroll.sticky-onscroll resize.sticky-onscroll', function () {
            stickyToggle(sticky, stickyWrapper, $(this));
        });

        stickyToggle(sticky, stickyWrapper, $(window));
    });

    //
    // SCROLLING TO PROPER SECTION IN SUB NAV
    //
    $("a.scrollTo").click(function(e){
        e.preventDefault();
        $('html').scrollTo(this.hash, 1200, {
            offset:-63,
            interrupt:true
        });
    });

    $(document).on("scroll", onScroll);
});