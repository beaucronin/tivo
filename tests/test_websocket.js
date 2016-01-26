var Controller = require('./controller.js').Controller,
	readers = require('./readers.js'),
	writers = require('./writers.js'),
	http = require('http'),
	express = require('express');

var app = express(),
	server = http.createServer(app);

var filename = 'testEvents.json',
	reader = new readers.FileReader(filename),
	writer = new writers.WebSocketWriter(server),
	controller = new Controller(reader, writer);
