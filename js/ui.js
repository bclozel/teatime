define(["moment","clock","teatime"],
    function(moment,clock,teatime) {


        var getHiddenProp = function(){
            var prefixes = ['webkit','moz','ms','o'];

            // if 'hidden' is natively supported just return it
            if ('hidden' in document) return 'hidden';

            // otherwise loop over all the known prefixes until we find one
            for (var i = 0; i < prefixes.length; i++){
                if ((prefixes[i] + 'Hidden') in document)
                    return prefixes[i] + 'Hidden';
            }

            // otherwise it's not supported
            return null;
        }

        var isHidden = function() {
            var prop = getHiddenProp();
            if (!prop) return false;

            return document[prop];
        }


        var visChange = function() {

            if (isHidden()) {
                clock.pause();
            } else {
                clock.start();
            }
        }

        var handleClockEvent = function(event) {
            updateTeatimeStatus(event.detail.time);
        };

        var updateTeatimeStatus = function(currentTime) {
            var answerzone = document.getElementById("answer");
            var msgzone = document.getElementById("message");
            var timezone = document.getElementById("remainingtime");

            var result = teatime.isTeaTime(currentTime);

            console.dir(result);

            if(result.isTeaTime) {
                answerzone.innerText = result.current.answer;
                msgzone.innerHTML = result.current.message;
                timezone.innerText = "";
            } else {
                answerzone.innerText = "Non";
                msgzone.innerText = "";
                timezone.innerHTML = "Prochain thé <strong>" + result.fromNow +"</strong>";
            }

        };

        var init = function() {

            // use the property name to generate the prefixed event name
            var visProp = getHiddenProp();
            if (visProp) {
                var evtname = visProp.replace(/[H|h]idden/,'') + 'visibilitychange';
                document.addEventListener(evtname, visChange);
            }

            document.body.addEventListener("minuteClockEvent", handleClockEvent, false);

            clock.start();

        };

        return {
            init:init,
            update: updateTeatimeStatus
        }
    }
);
