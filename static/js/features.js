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
                    y: 20
                },
                'coor_target' : {
                    x: center.x,
                    y: center.y - 50
                }
            },
            'case' : {
                'coor_text': {
                    x: width - 20,
                    y: 20
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
                    x: center.x,
                    y: center.y + 25
                }
            },
            'inside' : {
                'coor_text': {
                    x: width - 20,
                    y: center.y + 20
                },
                'coor_target' : {
                    x: center.x - 5,
                    y: center.y + 125
                }
            },
            'usb'  : {
                'coor_text': {
                    x: 20,
                    y: height - 120
                },
                'coor_target' : {
                    x: center.x,
                    y: center.y + 185
                }
            }
        };
    }

    function paintEntry(key) {
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#fafafa';
        var x = feature[key].coor_text.x;
        var y = feature[key].coor_text.y;
        ctx.moveTo(x , y);
        x = feature[key].coor_target.x;
        y = feature[key].coor_target.y;
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.stroke();
        //console.log(key, feature[key]);
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

            console.log(features);

        };
        img.src = "./static/images/trezor.png";
    }

    draw();
    $(window).resize(function () {
        draw();
    });


});
