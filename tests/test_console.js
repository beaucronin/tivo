var Controller = require('./controller.js').Controller,
	readers = require('./readers.js'),
	writers = require('./writers.js');

var filename = 'testEvents.json';
var reader = new readers.FileReader(filename),
	writer = new writers.ConsoleWriter(),
	controller = new Controller(reader, writer);

controller.play({
	start: new Date('2016-01-01T00:00:00.000Z'),
	end: new Date('2016-01-01T00:00:10.000Z'),
	loop: true,
	speed: 5.0
})

