var tessel = require('tessel');
var ambientlib = require('ambient-attx4');

var ambient = ambientlib.use(tessel.port['A']);

ambient.on('ready', function () {

    // Get points of light and sound data.
    setInterval(function () {
        ambient.getLightLevel(function(err, lightdata) {
            if (err) throw err;
            ambient.getSoundLevel( function(err, sounddata) {
                if (err) throw err;
                console.log("Light level:", lightdata.toFixed(8), " ", "Sound Level:", sounddata.toFixed(8));
            });
        });
    }, 200); // The readings will happen every .5 seconds

});

ambient.on('error', function (err) {
    console.log(err);
});