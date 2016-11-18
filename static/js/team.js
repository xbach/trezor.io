(function ($) {

  $.fn.shuffle = function () {

    var allElems = this.get(),
      getRandom = function (max) {
        return Math.floor(Math.random() * max);
      },
      shuffled = $.map(allElems, function () {
        var random = getRandom(allElems.length),
          randEl = $(allElems[ random ]).clone(true)[ 0 ];
        allElems.splice(random, 1);
        return randEl;
      });

    this.each(function (i) {
      $(this).replaceWith($(shuffled[ i ]));
    });

    return $(shuffled);

  };

})(jQuery);
$(document).ready(function () {
  $('.shuffle').shuffle();
});

window.washingmashine = function () {
  $('.team-section .person .header img').each(function() {
    var obj = $(this);
    var time = Math.random() * 2;
    var spin = Math.random() < 0.5;
    if (spin) {
      obj.css('animation', 'spin '+time+'s linear infinite');
    } else {
      obj.css('animation', 'spinleft '+time+'s linear infinite'); 
    }
  });
};
