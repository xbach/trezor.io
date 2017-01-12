/* our code */
$(document).ready(function () {

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

  function getParameterByName (name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[ 2 ]) return '';
    return decodeURIComponent(results[ 2 ].replace(/\+/g, " "));
  }

  function domain (url) {
    var m = url.match(/:\/\/(.[^\/]+)/);
    return m ? m[ 1 ] : null;
  }

  function hexlify (str) {
    var hex = '';
    for (var i = 0; i < str.length; i++)
      hex += str.charCodeAt(i).toString(16);
    return hex;
  }

  function prepareAffilAnchors (str) {
    $('a.shop-btn').each(function (idx) {
      var attr = $(this).attr('href');
      $(this).attr('href', attr + str);
    });
  }

  function domainKey (url) {
    var parser = document.createElement('a');
    parser.href = url;
    //remove second level subdomain
    var regexParse = new RegExp('([a-z\-0-9]{2,63})\.([a-z\.]{2,5})$');
    var urlParts = regexParse.exec(parser.hostname);
    return urlParts && (urlParts.length > 1) ? urlParts[1] + '.' + urlParts[2] : null;

  }

  function handleAffil () {
    var aParam = getParameterByName('a');
    if (aParam) {
      prepareAffilAnchors('?a=' + aParam);
      return;
    }
    var hParam = getParameterByName('h');
    if (hParam) {
      prepareAffilAnchors('?h=' + hParam);
      return;
    }
    var referrer = domainKey(domain(document.referrer));
    if (referrer) {
      prepareAffilAnchors('?h=' + hexlify(referrer));
      return;
    }
  }

  function scrolled (event) {
    var scrollPos = $(document).scrollTop();
    $('.scrollTo').each(function () {
      var currLink = $(this);
      var refElement = $(currLink.attr("href"));
      if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
        $('.scrollTo').removeClass("active");
        currLink.addClass("active");
      }
      else {
        currLink.removeClass("active");
      }
    });
  }

  function createStickyNav (sticky) {
    if (typeof sticky !== 'undefined') {
      $(document).on('scroll', scrolled);
    }
  }

  function shuffleTeam (team) {
    if (typeof team !== 'undefined') {
      team.shuffle();
    }
  }

  // On the RUN

  var OSName = "unknown",
    win = $('html'),
    $jumbo = $('#jumbotron'),
    $header = $('#header'),
    h = window.innerHeight;

  // reorder platform icons
  if (navigator.appVersion.indexOf("Win") != -1) OSName = "win";
  if (navigator.appVersion.indexOf("Mac") != -1) OSName = "mac";
  if (navigator.appVersion.indexOf("X11") != -1) OSName = "linux";
  if (navigator.appVersion.indexOf("Linux") != -1) OSName = "linux";
  $("#" + OSName).prependTo("#platforms");

  // jumbo height fixer
  $jumbo.css('max-height', h + 'px');
  $header.css('max-height', h + 'px');

  // jumbotron headline fitting
  $("#headline").fitText(1.1);
  $("#lead").fitText(1.8);

  // typing effect
  $('#lead-typer').typed({
    stringsElement: $('#lead-ghost'),
    backDelay: 500,
    backSpeed: 100,
    loop: true
  });

  handleAffil();

  var raf = requestAnimationFrame || mozRequestAnimationFrame ||
    webkitRequestAnimationFrame || msRequestAnimationFrame;
  if (raf) {
    raf(function() {
      $("img.lazy").lazyload({
        threshold : 500
      }); })
  };

  shuffleTeam($('.shuffle'));
  createStickyNav($("#sticky-nav"));

  $('.scrollTo').on('click touchstart', function (e) {
    e.preventDefault();
    var target = this.hash,
      $target = $(target);
    $('html, body').stop().animate({
      scrollTop: $target.offset().top + 2
    }, 500, 'swing', function () {
      window.location.hash = target;
    });
  });

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
  $('.team-section .person .header').each(function() {
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
  $('.team-section .person .header').each(function() {
    var obj = $(this);
    obj.css('animation', '');
  });
}
