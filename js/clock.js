define(["moment"],
    function(moment) {

        var interval;

        var getX = function(degrees, r, adjust, x) {
            var x = x || r,
                adj = adjust || 1;
            return x + r * adj * Math.cos(getRad(degrees));
        };

        var getY = function(degrees, r, adjust, y) {
            var y = y || r,
                adj = adjust || 1;
            return y + r * adj * Math.sin(getRad(degrees));
        };

        var getRad = function(degrees) {
            var adjust = Math.PI / 2;
            return (degrees * Math.PI / 180) - adjust;
        };

        var drawClock = function(currentTime) {
            // Constants for hand's sizes.
            var SECONDS_HAND_SIZE = 0.95,
                MINUTES_HAND_SIZE = 0.85,
                HOURS_HAND_SIZE = 0.55;

            var r = document.getElementById("licircle").getAttribute("r");
            var cx = parseInt(document.getElementById("licircle").getAttribute("cx"),10);
            var cy = parseInt(document.getElementById("licircle").getAttribute("cy"),10);

            // Draw Hands
            drawHand(document.getElementById("second"),
                currentTime.seconds(),
                SECONDS_HAND_SIZE,
                6);
            drawHand(document.getElementById("minute"),
                currentTime.minutes(),
                MINUTES_HAND_SIZE,
                6);
            drawHand(document.getElementById("hour"),
                currentTime.hours() + currentTime.minutes()/60,
                HOURS_HAND_SIZE,
                30);

            function drawHand(hand, value, size, degrees) {
                var deg = degrees * value;
                x2 = getX(deg, r, size, cx),
                    y2 = getY(deg, r, size, cy);

                hand.setAttribute('x2', x2);
                hand.setAttribute('y2', y2);
            }
        };

        var start = function() {
            drawClock(moment());
            unpause();
        };

        var pause = function() {
            window.clearInterval(interval);
        };

        var unpause = function() {
            interval = window.setInterval(function(){drawClock(moment())}.bind(this),1000);
        };

        return {
            start: start,
            pause: pause,
            unpause: unpause
        }

    });