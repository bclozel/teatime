require(['ui','teatime'], function(ui,teatime){

    ui.init();
    teatime.init();

    window.testdate = moment("2013-04-19 15:30");

    window.teatime = teatime;

});