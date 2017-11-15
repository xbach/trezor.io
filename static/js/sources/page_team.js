/* our code */
$(document).ready(function () {

  $.fn.shuffle = function () {
    var allElems = this.get(),
      getRandom = function (max) {
        return Math.floor(Math.random() * max);
      },
      shuffled = $.map(allElems, function () {
        var random = getRandom(allElems.length),
          randEl = $(allElems[random]).clone(true)[0];
        allElems.splice(random, 1);
        return randEl;
      });
    this.each(function (i) {
      $(this).replaceWith($(shuffled[i]));
    });
    return $(shuffled);
  };

  function shuffleTeam(team) {
    if (typeof team !== 'undefined') {
      team.shuffle();
    }
  }


  shuffleTeam($('.shuffle'));

});

var pepitacounter = 0;
$($('.team-section .person .header')[0]).click(function () {
  pepitacounter++;
  if (pepitacounter === 5) {
    laundromat();
  }
  if (pepitacounter === 6) {
    laundromatOff();
    pepitacounter = 0;
  }
});

function laundromat() {
  $('.team-section .person .header, .team-section .person .header2').each(function () {
    var obj = $(this);
    var time = Math.random() * 2;
    var spin = Math.random() < 0.5;
    if (spin) {
      obj.css('animation', 'laundromat-right ' + time + 's linear infinite');
    } else {
      obj.css('animation', 'laundromat-left ' + time + 's linear infinite');
    }
  });
}

function laundromatOff() {
  $('.team-section .person .header, .team-section .person .header2').each(function () {
    var obj = $(this);
    obj.css('animation', '');
  });
}
