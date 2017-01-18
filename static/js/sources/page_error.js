$(document).ready(function() {

  // Add the missing url to the text
  $("#url").text(window.location.pathname);

  var raf = requestAnimationFrame || mozRequestAnimationFrame ||
    webkitRequestAnimationFrame || msRequestAnimationFrame;
  if (raf) {
    raf(function() {
      $("img.lazy").lazyload({
        threshold : 500
      });
    });
  }

  // Fix the css locations dynamically
  $("head link").each(function() {
    for (var i=0; i<window.location.pathname.split(/\//g).length-2; i++)
      $(this).attr("href", "../" + $(this).attr("href"));
  });

  var $error = $('#error'),
    h = window.innerHeight - 280;
  // height fixer
  $error.css('min-height', h + 'px');
})