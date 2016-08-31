$(document).ready(function () {
    var can = document.getElementById('featureCanvas');
    var ctx = can.getContext('2d');
    var width, height, center = 0;

    function add1TextBlock() {
        ctx.font='300 30px "Open Sans", sans-serif';
        ctx.fillStyle = '#fafafa';
        ctx.fillText("Small & Brilliant",10, 50);
    }

    function add2TextBlock() {
        ctx.font='300 30px "Open Sans", sans-serif';
        ctx.fillStyle = '#fafafa';
        ctx.fillText("Unhackable", 800, 50);
    }

    function draw() {
        width = can.width = can.scrollWidth,
        height = can.height = can.scrollHeight,
        center = {
            x: width / 2,
            y: height / 2
        };

        // TREZOR IMAGE
        var img = new Image();
        img.onload = function() {
            ctx.beginPath();
            ctx.drawImage(img, center.x - 82, (height - 380) / 2, 164, 380);

            add1TextBlock();
            add2TextBlock();
        };
        img.src = "./static/images/trezor.png";
    }


    draw();
    $( window ).resize(function() {
        draw();
    });


});
