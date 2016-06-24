var av = require('tessel-av');
var os = require('os');
var http = require('http');
var port = 8080;
var camera = new av.Camera();

http.createServer(function (req, res) {

    console.log('Request received');

    var takePicture = camera.capture();

    takePicture.on('data', function (image) {
        console.log('Picture data!', image);   
        res.writeHead(200, {'Content-Type': 'image/jpg'});
        res.write(image);
        res.end();
    });

}).listen(port, () => console.log(`http://${os.hostname()}.local:${port}`));