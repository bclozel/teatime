// Configure RequireJS
require.config({
    baseUrl:'../js'
    //urlArgs: "v="+(new Date()).getTime()
});

// Require libraries
require(['../test/chai', '../test/mocha'], function(chai){

    // Chai
    assert = chai.assert;
    should = chai.should();
    expect = chai.expect;

    // Mocha
    mocha.setup('bdd');

    // Require base tests before starting
    require(['../test/teatime'], function(teatime){
        // Start runner
        mocha.run();
    });

});