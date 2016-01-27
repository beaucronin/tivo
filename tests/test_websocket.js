var tivo = require('../index'),
	http = require('http'),
	express = require('express'),
	WebSocketServer = require('ws').Server;

var app = express(),
	server = http.createServer(app),
	wss = new WebSocketServer({ server: server }),
	filename = 'testEvents.json';

server.listen(8080);
console.log('listening...');

wss.on('connection', function(ws) {
	var reader = new tivo.readers.FileReader(filename),
		writer = new tivo.writers.WebSocketWriter(ws),
		controller = new tivo.Controller(reader, writer);

	ws.on('close', function() {
		console.log('websocket closed');
	});

	ws.on('message', function(data, flags) {
		obj = JSON.parse(data);
		console.log(obj);
		if ('command' in obj)
			controller.executeCommand(obj);
	});
});

