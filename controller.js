var _ = require('underscore');

var DEFAULT_WINDOW = 10;

var Controller = function(reader, writer) {
	this.reader = reader;
	this.writer = writer;
	this.timerPool = [];
}

Controller.prototype = {
	constructor: Controller,

	play: function(command) {
		this.clearTimerPool();
		var startTime = command.start,
			endTime = command.end;
		var speed = 1.0;
		if ('speed' in command) {
			speed = command.speed;
		}

		this.addToEventPool(startTime, endTime, speed);
	},

	stop: function() {
		this.clearTimerPool();
	},

	addToEventPool: function(startTime, endTime, speed) {
		this.reader.getEvents(
			startTime,
			endTime,
			(function(controller) {
				return function(e) { 
					var delay = (e.__event_date.getTime() - startTime.getTime()) / speed;
					// console.log(Object.keys(this));
					controller.timerPool.push(setTimeout(function() {
						controller.writer.writeEvent(e);
					}, delay));
				}
			})(this),
			function() {
				var loopTime = endTime.getMilliseconds() - startTime.getMilliseconds() / speed;
				setTimeout(function() {
					clearTimerPool();
				}, loopTime);			
			}
		);
	},

	clearTimerPool: function() {
		_.each(this.timerPool, function(t) { clearTimeout(t); })
		this.timerPool = [];
	}
}

module.exports.Controller = Controller;
