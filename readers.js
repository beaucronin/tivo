var _ = require('underscore'),
	pg = require('pg'),
	fs = require('fs');

var FileReader = function(filename) {
	this.filename = filename;
}

FileReader.prototype = {
	constructor: FileReader,

	getEvents: function(startTime, endTime, objFunc, cleanupFunc) {
		fs.readFile(this.filename, (err, data) => {
			if (err) throw err;
			eventsObj = JSON.parse(data);
			_.each(eventsObj, function(obj) {
				var eventDate = new Date(obj.event_date);
				// console.log(startTime + ' ' + endTime + ' ' + new Date(obj.event_date));
				if (eventDate >= startTime && eventDate <= endTime) {
					obj.event_data.__event_date = eventDate;
					objFunc(obj.event_data);
				}
			});
			cleanupFunc();
		})
	}
}

var PGReader = function(conString) {
	this.conString = conString;
}

PGReader.prototype = {
	constructor: PGReader,

	getEvents: function(startTime, endTime, objFunc, cleanupFunc) {
		pg.connect(this.conString, function(err, client, done) {
			client.query(
				'SELECT event_time, event_data FROM events WHERE event_time > $1 AND event_time <= $2 ORDER BY event_time, event_id',
				[startTime, endTime],
				function(err, result) {
					done();
					_.map(result.rows, 
						function(x) {
							var obj = JSON.parse(x.event_data);
							obj.__event_date = new Date(x.event_date);
							objFunc(obj);
						}
					);
					cleanupFunc();
				}
			);
		})
	}
}

module.exports.FileReader = FileReader;
module.exports.PGReader = PGReader;
