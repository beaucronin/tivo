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
		if ('speed' in command) 
			speed = command.speed;
		
		var loop = false;
		if ('loop' in command)
			loop = command.loop;

		this.addToEventPool(startTime, endTime, speed, loop);
	},

	stop: function() {
		this.clearTimerPool();
		this.writer.writeMessage({
			type: "STOP",
			text: "Stopping event playback"
		})
	},

	addToEventPool: function(startTime, endTime, speed, loop) {
		this.writer.writeMessage({
			type: "PLAY",
			text: "Playing events from " + startTime + " to " + endTime + " at " + speed + "x"
		})
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
			(function(controller) {
				return function() {
					var loopTime = (endTime.getTime() - startTime.getTime()) / speed;
					controller.timerPool.push(setTimeout(function() {
						controller.clearTimerPool();
						if (loop) {
							controller.addToEventPool(startTime, endTime, speed, loop);
							controller.writer.writeMessage({
								type: "END_LOOP",
								text: "Finished events, looping"
							})
						} else {
							controller.writer.writeMessage({
								type: "END_NOLOOP",
								text: "Finished events"
							})
						}

					}, loopTime));
				}
			})(this)
		);
	},

	clearTimerPool: function() {
		var count = 0
		_.each(
			this.timerPool, 
			function(t) { 
				clearTimeout(t); 
				if (! t._called)
					count += 1;
			})
		if (count > 0)
			this.writer.writeMessage({
				type: "EVENTS_CANCELED",
				text: count + " events cancelled"
			});
		this.timerPool = [];
	}
}

module.exports = Controller;
