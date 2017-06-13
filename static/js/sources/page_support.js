$(document).ready(function() {
    var raf = requestAnimationFrame || mozRequestAnimationFrame ||
        webkitRequestAnimationFrame || msRequestAnimationFrame;
    if (raf) {
        raf(function() {
            $("img.lazy").lazyload({
                threshold : 500
            });
        });
    }
});
