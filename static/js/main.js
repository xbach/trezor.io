/* our code */
$(document).ready(function () {

  var OSName="unknown";
  if (navigator.appVersion.indexOf("Win")!=-1) OSName="win";
  if (navigator.appVersion.indexOf("Mac")!=-1) OSName="mac";
  if (navigator.appVersion.indexOf("X11")!=-1) OSName="linux";
  if (navigator.appVersion.indexOf("Linux")!=-1) OSName="linux";
  $("#" + OSName).prependTo("#platforms");

  // jumbotron headline fitting
  $("#headline").fitText(1.1);
  $("#lead").fitText(1.8);

  $('#lead-typer').typed({
    stringsElement: $('#lead-ghost'),
    backDelay: 500,
    backSpeed: 100,
    loop: true
  });


});