var serialport = require("serialport")
var SerialPort = serialport.SerialPort;
var WebSocket = require('ws');

function readArgs() {
    if (process.argv.length < 5) {
        console.log('Usage: node counter.js url device rate');
        process.exit();
    }

    var url = process.argv[2];
    var device = process.argv[3];
    var rate = parseInt(process.argv[4]);

    var args = {'url' : url, 'device' : device, 'rate' : rate};
    console.log(args);

    return args;
}

function report() {
    var args = readArgs();    
    var client = new WebSocket(args.url);
    var serial = new SerialPort(args.device, {
        baudrate : args.rate,
        parser: serialport.parsers.readline("\n")
    });
    var empty = new Array(8);
    var count = empty.length;
    for (var i = 0; i < empty.length; i++)
        empty[i] = true;
    var serialOpened = false;

    serial.on('open', function() {
        console.log('Serial port opened');
        serialOpened = true;
        serial.write('' + count);
    });

    client.on('message', function(message) {
        msg = message.split(':');
        sensor = parseInt(msg[0]);

        if (empty[sensor] == (msg[1] == 'empty'))
            return;

        empty[sensor] = !empty[sensor];
        if (empty[sensor])
            count++;
        else
            count--;

        if (serialOpened)
            serial.write('' + count);

        console.log('' + count);
    });

    serial.on("error", function(msg) {
        console.log(msg);
    });

    client.on("error", function(msg) {
        console.log(msg);
    });
}

report()
