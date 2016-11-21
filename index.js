// Import the interface to Tessel hardware
const tessel = require('tessel');
const rfid = require('rfid-pn532').use(tessel.port['A']);
const accel = require('accel-mma84').use(tessel.port['B']);

// SLACK WEBHOOKS
const MY_SLACK_WEBHOOK_URL = 'https://fullstackacademy.slack.com/services/hooks/incoming-webhook?token=xoxp-2151814398-97669204741-106804006993-29c4602c3c6f3b33ea2b73bdc9d588ba';
const slack = require('slack-notify')(MY_SLACK_WEBHOOK_URL);

rfid.setPollPeriod(3000, function(err) {
	console.error(err);
});

accel.on('ready', function () { // Initialize the accelerometer.
  rfid.on('ready', function(version) { // Initialize the rfid.
    console.log('BeerSecurity is ready!');

    let user = null;

    rfid.on('data', function(card) {
      user = card.uid.toString('hex');
    });

    accel.on('data', function (xyz) { // Stream accelerometer data
      var x = xyz[0].toFixed(2);
      var y = xyz[1].toFixed(2);
      var z = xyz[2].toFixed(2);

      if (z > 0.5 && !user) {
        slack.send({
          channel: '#1610-fsa-ny-jr',
          text: ':rotating_light: :beer: :rotating_light: SOMEONE IS STEALING BEER :rotating_light: :beer: :rotating_light:'
        });
      } else if (z > 0.5 && user) {
        slack.send({
          channel: '#1610-fsa-ny-jr',
          text: `:beer: ${user} is grabbing a beer :beer:`
        });
      }
    });
  });
});

//  console.log('x:', xyz[0].toFixed(2),
//  'y:', xyz[1].toFixed(2),
//  'z:', xyz[2].toFixed(2));

rfid.on('error', function(err) {
	console.error(err);
});

accel.on('error', function(err){
 console.log('Error:', err);
});
