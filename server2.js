var express = require("express");
var http = require("http"); 

var WebSocketServer = require("ws").Server;
var Public = 'http';
var Port = 80;

/*
 * n - number of sensors
 * t - threshold on the sensor value
 * k - number of sensor reports to
 *     wait before updating the clients
 */
function server(n, t, k) {
    var app = express();
    var srv = http.createServer(app);
    var ws = new WebSocketServer({server: srv});
    var counts = new Array(n);
    var states = new Array(n);

    for (var i = 0; i < states.length; i++)
        states[i] = 'empty';

    var broadcast = function (data) {
      ws.clients.forEach(function each(client) {
        client.send(data);
      });
    };

    ws.on('connection', function(connection) {
        connection.on('message', function(message) {
            var parts = message.split(':');
            var sensor = parseInt(parts[0]);
            var value = parseInt(parts[1]);
            var state = 'empty';

            if (value < t)
                state = 'occupied';

            if (state != states[sensor]) {
                states[sensor] = state;
                counts[sensor] = 0;
            }

            if (counts[sensor] <= k + 1)
                counts[sensor]++;

            if (counts[sensor] == k) {
                console.log(sensor + ':' + state);
                broadcast(sensor + ':' + state);
            }
        });

        states.forEach(function(state, i) {
            connection.send(i + ':' + state);
        });
    });

    app.use(express.static(Public));
    srv.listen(Port);
}

server(8, 60, 3);
