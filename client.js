var serialport = require("serialport")
var WebSocket = require('ws')
var SerialPort = serialport.SerialPort;

function readArgs() {
    if (process.argv.length < 5) {
        console.log('Usage: node client.js url device rate');
        process.exit();
    }

    var url = process.argv[2];
    var device = process.argv[3];
    var rate = parseInt(process.argv[4]);

    var args = {'url' : url, 'device' : device, 'rate' : rate};
    console.log(args);

    return args;
}

function replicate() {
    var args = readArgs();    
    var client = new WebSocket(args.url);
    var serial = new SerialPort(args.device, {
        baudrate : args.rate,
        parser: serialport.parsers.readline("\n")
    });

    serial.on("error", function(msg) {
        console.log(msg);
    });

    serial.on("data", function(message) {
        var sensor = parseInt(message[6]);
        var value = parseInt(message.substring(8));
        client.send('' + sensor + ':' + value);
    });
}

replicate();
