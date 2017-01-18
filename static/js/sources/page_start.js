$(document).ready(function () {

  var raf = requestAnimationFrame || mozRequestAnimationFrame ||
    webkitRequestAnimationFrame || msRequestAnimationFrame;
  if (raf) {
    raf(function() {
      $("img.lazy").lazyload({
        threshold : 500
      });
    });
  }

  var $start = $('#start'),
    h = window.innerHeight - 280;
  $start.css('min-height', h + 'px');
});
