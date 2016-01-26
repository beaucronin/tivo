var tivo = require('../index'),
	http = require('http'),
	express = require('express');

var app = express(),
	server = http.createServer(app),
	filename = 'testEvents.json',
	reader = new tivo.readers.FileReader(filename),
	writer = new tivo.writers.WebSocketWriter(server),
	controller = new tivo.Controller(reader, writer);
