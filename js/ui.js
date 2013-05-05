define(["moment","clock"],
    function(moment,clock) {


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
                    console.log("clock paused");
                } else {
                    clock.unpause();
                    console.log("clock unpaused");
                }
        }

        var init = function() {

            // use the property name to generate the prefixed event name
            var visProp = getHiddenProp();
            if (visProp) {
                var evtname = visProp.replace(/[H|h]idden/,'') + 'visibilitychange';
                document.addEventListener(evtname, visChange);
            }

            clock.start();

        };

        return {
            init:init

        }


    }
);
