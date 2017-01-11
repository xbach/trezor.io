$(document).ready(function () {

  var can = document.getElementById('featureCanvas'),
    ctx = can.getContext('2d'),
    featuresList = document.getElementById("features-list"),
    features = featuresList.getElementsByClassName("entry"),
    width, height, center, feature = 0,
    img = new Image();

  function recalculate () {
    width = can.width = can.scrollWidth;
    height = can.height = can.scrollHeight;
    center = {
      x: width / 2,
      y: height / 2
    };
    feature = {
      'display': {
        'coor_text': {
          x: 20,
          y: 80
        },
        'coor_target': {
          x: center.x - 12,
          y: center.y - 60
        }
      },
      'case': {
        'coor_text': {
          x: width - 20,
          y: 80
        },
        'coor_target': {
          x: center.x + 30,
          y: center.y - 145
        }
      },
      'buttons': {
        'coor_text': {
          x: 20,
          y: center.y - 20
        },
        'coor_target': {
          x: center.x - 10,
          y: center.y + 33
        }
      },
      'inside': {
        'coor_text': {
          x: width - 20,
          y: center.y + 20
        },
        'coor_target': {
          x: center.x + 5,
          y: center.y + 120
        }
      },
      'usb': {
        'coor_text': {
          x: 20,
          y: height - 200
        },
        'coor_target': {
          x: center.x - 10,
          y: center.y + 205
        }
      }
    };
  }

  function wrapText (text, x, y, maxWidth, lineHeight) {
    var cars = text.split("\n");

    for (var ii = 0; ii < cars.length; ii++) {

      var line = "";
      var words = cars[ ii ].split(" ");

      for (var n = 0; n < words.length; n++) {
        var testLine = line + words[ n ] + " ";
        var metrics = ctx.measureText(testLine);
        var testWidth = metrics.width;

        if (testWidth > maxWidth) {
          ctx.fillText(line, x, y);
          line = words[ n ] + " ";
          y += lineHeight;
        }
        else {
          line = testLine;
        }
      }

      ctx.fillText(line, x, y);
      y += lineHeight;
    }
  }

  function paintEntry (key, renderLine) {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#ddd';

    // obtain source target coordinates
    var trgtX = feature[ key ].coor_target.x;
    var trgtY = feature[ key ].coor_target.y;

    // obtain text block coordinates
    var txtX = feature[ key ].coor_text.x;
    var txtY = feature[ key ].coor_text.y;

    // draw text - headline
    var entryBlock = document.getElementById(key);
    var title = entryBlock.getElementsByTagName('h3')[ 0 ].innerHTML;

    drawLinesNCircle(trgtX, trgtY, txtX, txtY, 250);

    if (renderLine) {
      $('#g').css({top: trgtY - 3, left: txtX < trgtX ? trgtX + 18 : trgtX + 6});
    }

    ctx.fillStyle = '#ddd';
    ctx.font = "23px 'Open Sans', sans-serif";
    var titleWidth = 250; //ctx.measureText(title).width;
    ctx.fillText(title, txtX < trgtX ? txtX : txtX - titleWidth, txtY - 12);

    // draw text block
    ctx.fillStyle = '#99979c';
    ctx.font = "400 15px/1.75 -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif";
    var text = $(entryBlock.getElementsByTagName('p')[ 0 ]).text().replace(/\s+/g, " ");
    ctx.textAlign = "left";
    if (txtX < trgtX) {
      wrapText(text, txtX, txtY + 10, titleWidth, 17);
    } else {
      wrapText(text, txtX - titleWidth, txtY + 10, titleWidth, 17);
    }

    // console.log(title, text);
  }

  function drawLinesNCircle (trgtX, trgtY, txtX, txtY, titleWidth) {
    // paint source target circle
    ctx.beginPath();
    ctx.arc(txtX < trgtX ? trgtX + 6 : trgtX - 6, trgtY, 6, 0, 2 * Math.PI);

    // calculate difference step
    var temp = trgtY - txtY;
    ctx.moveTo(trgtX, trgtY);
    if (txtX < trgtX) {
      // text on left
      var newX = trgtX - 120;
      ctx.lineTo(newX, trgtY);
      ctx.lineTo(newX - temp, txtY);

    } else {
      // text on right
      newX = trgtX + 120;
      ctx.lineTo(newX, trgtY);
      ctx.lineTo(newX + temp, txtY);
    }

    // finishing line to text
    ctx.lineTo(txtX, txtY);
    ctx.stroke();

    // hide underline effect
    ctx.fillStyle = '#111111';
    if (txtX < trgtX) {
      ctx.fillRect(txtX, txtY - 1, titleWidth + 15, 4);
    } else {
      ctx.fillRect(txtX - titleWidth - 15, txtY - 1, titleWidth + 15, 4);
    }
  }

  function draw (tempKey) {
    recalculate();
    // TREZOR IMAGE
    ctx.beginPath();
    ctx.drawImage(img, center.x - 182, (height - 558) / 2, 364, 568);
    if(tempKey == null) {
      $('#g').hide();
    }
    Object.keys(feature).map(function (key) {
      paintEntry(key, tempKey == key);
    });
    if(tempKey != null) {
      $('#g').show();
    }
  }

  img.onload = function () {
    draw(null);
  };
  img.src = "./static/images/trezor-black-select.png";
  $(window).resize(function () {
    draw(null);
  });

  can.addEventListener('mousemove', function (e) {
    var mouseX = e.offsetX;
    var mouseY = e.offsetY;
    var tempKey = null;

    Object.keys(feature).map(function (key) {
      // obtain source target coordinates

      var trgtX = feature[ key ].coor_target.x;
      var trgtY = feature[ key ].coor_target.y;

      // obtain text block coordinates
      var txtX = feature[ key ].coor_text.x;
      var txtY = feature[ key ].coor_text.y;

      if (txtX < trgtX) {
        // text on left
        if (txtX < mouseX && mouseX < txtX + 250) {
          if (txtY - 20 < mouseY && mouseY < txtY + 70) {
            tempKey = key;
          }
        }
      } else {
        // text on right
        if (txtX - 250 < mouseX && mouseX < txtX) {
          if (txtY - 20 < mouseY && mouseY < txtY + 70) {
            tempKey = key;
          }
        }
      }
    });
    draw(tempKey);
    tempKey = null;
  }, true);

});
