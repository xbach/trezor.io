$(document).ready(function () {

  var $start = $('#start'),
    h = window.innerHeight - 280;
  $start.css('min-height', h + 'px');


  var $form = $('#mail-subscribe');


  if ( $form.length > 0 ) {
    $('#mail-subscribe input[type="submit"]').bind('click', function ( event ) {
      if ( event ) event.preventDefault();
      var mail = $('#mail-subscribe input[type="email"]')[0].value;
      if ( isEmail(mail) ) {
        register();
      } else {
        $('#mail-subscribe input[type="email"]').addClass('red');
      }
    });
  }

  function gotoNext() {
      $("#step4").fadeIn('fast');
      $('html, body').animate({
          scrollTop: $("#step4").offset().top
      }, 500);
  }

  function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

  function register() {
    console.warn('register');
    $.ajax({
      type: $form.attr('method'),
      url: $form.attr('action'),
      data: $form.serialize(),
      cache       : false,
      dataType    : 'json',
      contentType: "application/json; charset=utf-8",
      error       : function(err) { alert("Could not connect to the registration server. Please try again later."); },
      success     : function() {
        gotoNext();
      }
    });
  }

  $( ".gotoNext" ).click(function() {
    gotoNext();
  });
});
