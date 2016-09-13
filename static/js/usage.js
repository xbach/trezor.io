$(document).ready(function () {
  //
  // FREEWALL MOSAIC LAYOUT in USAGE SECTION
  //

  $(".usage-container").each(function () {
    var wall = new Freewall(this);
    wall.reset({
      selector: '.item',
      fixSize: false,
      draggable: false,
      cellW: 145,
      cellH: 70,
      onResize: function () {
        this.fitWidth();
      }
    });
    wall.fitWidth();
  });

  /*
   $(".filter").click(function() {
   $(".filter").removeClass("active");
   var filter = $(this).addClass('active').data('filter');
   if (filter) {
   wall.filter(filter);
   } else {
   wall.unFilter();
   }
   });
   */

  $(".item").click(function () {
    $(".item").removeClass('active');
    $(this).addClass('active');
    $('#money-expand').html('').removeClass('expanded');
    $('#identity-expand').html('').removeClass('expanded');
    $('#other-expand').html('').removeClass('expanded');
    var classType = $(this).attr("class").split(' ')[ 1 ];
    $('#' + classType + '-expand').html($(this).html()).addClass('expanded');

    //$(".expanded").addClass("closed").removeClass("expanded");
    //$(this).removeClass("closed").addClass('expanded');
    //$("#side-content").addClass($(this).attr("class").split(' ')[1]);
    //$("#side-content").html($(this).html());
    //wall.filter(".closed");
  });
});