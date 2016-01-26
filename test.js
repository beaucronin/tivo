var Controller = require('./controller.js').Controller,
	readers = require('./readers.js'),
	writers = require('./writers.js');

var filename = 'scripts/tweets.json';
var reader = new readers.FileReader(filename),
	writer = new writers.ConsoleWriter(),
	controller = new Controller(reader, writer);

controller.play({
	start: new Date('2016-01-26T00:14:27.000Z'),
	end: new Date('2016-01-26T00:14:35.000Z'),
	loop: false,
	speed: 1.0
})

