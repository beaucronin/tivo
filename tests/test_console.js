var tivo = require('../index');

var filename = 'testEvents.json';
var reader = new tivo.readers.FileReader(filename),
	writer = new tivo.writers.ConsoleWriter(),
	controller = new tivo.Controller(reader, writer);

controller.play({
	start: new Date('2016-01-01T00:00:00.000Z'),
	end: new Date('2016-01-01T00:00:10.000Z'),
	loop: true,
	speed: 5.0
})

