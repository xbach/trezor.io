$(document).ready(function () {

    var can = document.getElementById('featureCanvas'),
        ctx = can.getContext('2d'),
        featuresList = document.getElementById("features-list"),
        features = featuresList.getElementsByClassName("entry"),
        width, height, center, feature = 0;

    function recalculate() {
        width = can.width = can.scrollWidth;
        height = can.height = can.scrollHeight;
        center = {
            x: width / 2,
            y: height / 2
        };
        feature = {
            'display' : {
                'headline' : featuresList.getElementsByTagName('h2')[0],
                'coor_text': {
                    x: 20,
                    y: 80
                },
                'coor_target' : {
                    x: center.x + 5,
                    y: center.y - 43
                }
            },
            'case' : {
                'coor_text': {
                    x: width - 20,
                    y: 80
                },
                'coor_target' : {
                    x: center.x + 5,
                    y: center.y - 125
                }
            },
            'buttons' : {
                'coor_text': {
                    x: 20,
                    y: center.y - 20
                },
                'coor_target' : {
                    x: center.x - 20,
                    y: center.y + 23
                }
            },
            'inside' : {
                'coor_text': {
                    x: width - 20,
                    y: center.y + 20
                },
                'coor_target' : {
                    x: center.x + 25,
                    y: center.y + 95
                }
            },
            'usb'  : {
                'coor_text': {
                    x: 20,
                    y: height - 120
                },
                'coor_target' : {
                    x: center.x + 10,
                    y: center.y + 185
                }
            }
        };
    }

    function paintEntry(key) {
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#ddd';

        // obtain source target coordinates
        var trgtX = feature[key].coor_target.x;
        var trgtY = feature[key].coor_target.y;

        // obtain text block coordinates
        var txtX = feature[key].coor_text.x;
        var txtY = feature[key].coor_text.y;

        // paint source target circle
        ctx.arc(txtX < trgtX ? trgtX + 6 : trgtX - 6,trgtY,6,0,2*Math.PI);

        // calculate difference step
        var temp = trgtY - txtY;
        ctx.moveTo(trgtX , trgtY);
        if(txtX < trgtX) {
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

        // draw text - headline
        var textBlock = document.getElementById(key);
        var title = textBlock.getElementsByTagName('h3')[0].innerHTML;

        ctx.fillStyle = '#ddd';
        ctx.font="23px 'Open Sans', sans-serif";
        var titleWidth = ctx.measureText(title).width;
        ctx.fillText(title, txtX < trgtX ? txtX : txtX - titleWidth, txtY - 12);

        // var text =  textBlock.getElementsByTagName('p')[0].innerHTML;
        // console.log(title, text);
    }

    function draw() {
        recalculate();

        // TREZOR IMAGE
        var img = new Image();
        img.onload = function () {
            ctx.beginPath();
            ctx.drawImage(img, center.x - 82, (height - 380) / 2, 164, 380);

            Object.keys(feature).map(function (key) {
                paintEntry(key);
            });

            //console.log(features);

        };
        img.src = "./static/images/trezor.png";
    }

    draw();
    $(window).resize(function () {
        draw();
    });


});
