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
    // FREEWALL MOSAIC LAYOUT in USAGE SECTION
    //
    var wall = new Freewall("#usage-container");

    wall.reset({
        selector: '.item',
        fixSize: false,
        draggable: false,
        cellW: 145,
        cellH: 100,
        onResize: function() {
            this.fitWidth();
        }
    });

    $(".filter").click(function() {
        $(".filter").removeClass("active");
        var filter = $(this).addClass('active').data('filter');
        if (filter) {
            wall.filter(filter);
        } else {
            wall.unFilter();
        }
    });

    wall.fitWidth();

    $(".item").click(function() {
        $(".expanded").addClass("closed").removeClass("expanded");
        $(this).removeClass("closed").addClass('expanded');
        wall.filter(".closed");
    });

    //
    // SCROLLING TO PROPER SECTION IN SUB NAV
    //
    $("a.scrollTo").click(function(e){
        e.preventDefault();
        $('html').scrollTo(this.hash, 700, {
            offset:-63,
            interrupt:true
        });
    });

    $(document).on("scroll", onScroll);
});