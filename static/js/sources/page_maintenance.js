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

  var $maintenance = $('#maintenance'),
    h = window.innerHeight - 280;
  // height fixer
  $maintenance.css('min-height', h + 'px');
})