// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

/*********************************************
This basic RFID example listens for an RFID
device to come within range of the module,
then logs its UID to the console.
*********************************************/

var tessel = require('tessel');
var rfidlib = require('rfid-pn532');

var rfid = rfidlib.use(tessel.port['A']);

rfid.on('ready', function(version) {
	console.log('Ready to read RFID card');

	rfid.on('data', function(card) {
		console.log(card);
		console.log('UID:', card.uid.toString('hex'));
	});
});

rfid.setPollPeriod(3000, function(err) {
	console.error(err);
})

rfid.on('error', function(err) {
	console.error(err);
});