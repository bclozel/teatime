define(["moment"],
    function(moment) {

        var init = function() {

            moment.lang('fr', {
                months : "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),
                monthsShort : "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),
                weekdays : "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
                weekdaysShort : "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
                weekdaysMin : "Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),
                longDateFormat : {
                    LT : "HH:mm",
                    L : "DD/MM/YYYY",
                    LL : "D MMMM YYYY",
                    LLL : "D MMMM YYYY LT",
                    LLLL : "dddd D MMMM YYYY LT"
                },
                calendar : {
                    sameDay: "[Aujourd'hui à] LT",
                    nextDay: '[Demain à] LT',
                    nextWeek: 'dddd [à] LT',
                    lastDay: '[Hier à] LT',
                    lastWeek: 'dddd [dernier à] LT',
                    sameElse: 'L'
                },
                relativeTime : {
                    future : "dans %s",
                    past : "il y a %s",
                    s : "quelques secondes",
                    m : "une minute",
                    mm : "%d minutes",
                    h : "une heure",
                    hh : "%d heures",
                    d : "un jour",
                    dd : "%d jours",
                    M : "un mois",
                    MM : "%d mois",
                    y : "un an",
                    yy : "%d ans"
                },
                ordinal : function (number) {
                    return number + (number === 1 ? 'er' : 'ème');
                },
                week : {
                    dow : 1, // Monday is the first day of the week.
                    doy : 4  // The week that contains Jan 4th is the first week of the year.
                }
            });

        };

        var teatimes = [
            {start:{'hours':8,'minutes':0},end:{'hours':10,'minutes':0},'answer':"Oui.",'message':"Breakfast!"},
            {start:{'hours':11,'minutes':0},end:{'hours':11,'minutes':30},'answer':"Oui.",'message':"Elevenses"},
            {start:{'hours':16,'minutes':0},end:{'hours':17,'minutes':0},'answer':"Oui.",'message':"Afternoon"},
            {start:{'hours':17,'minutes':0},end:{'hours':18,'minutes':0},'answer':"Oui.",'message':"High tea"},
            {start:{'days':1,'hours':8,'minutes':0},end:{'days':1,'hours':10,'minutes':0},'answer':"Oui.",'message':"Breakfast!"},
        ];



        var isTeatime = function(currentTime) {

            var dayStart = currentTime.clone().startOf("day");
            var result = null;

            teatimes.some(function(teatime){

                if(currentTime.isBefore(dayStart.clone().add(teatime.start).seconds(0))) {

                    result = {isTeaTime:false,next:teatime};
                    return true;

                } else if(currentTime.isBefore(dayStart.clone().add(teatime.end).seconds(0))){

                    result = {isTeaTime:true,current:teatime};
                    return true;
                }

            });

            return result;
        };

        return {
            init:init,
            isTeaTime:isTeatime
        }
    }
);