var http = require('http');
var server = http.createServer();
var tessel = require('tessel');
var camera = require('camera-vc0706').use(tessel.port['A']);

server.on('request', function (req, res) {
    if (req.url === '/') {
        camera.takePicture(function (err, image) {
            if (err) return console.error(err);
            res.setHeader('Content-Type', 'image/jpg');
            res.end(image, 'binary');
        });
    }
});

camera.on('ready', function () {
    server.listen(1337, function () {
        console.log('Server listening!');
    });
});