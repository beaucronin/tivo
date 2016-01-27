var WebSocketServer = require('ws').Server;

var ConsoleWriter = function() {

}

ConsoleWriter.prototype = {
	constructor: ConsoleWriter,

	writeEvent: function(e) {
		console.log(e.text);
	},

	writeMessage: function(msg) {
		console.log(msg.text);
	}
}

var WebSocketWriter = function(ws) {
	this.ws = ws;
}

WebSocketWriter.prototype = {
	constructor: WebSocketWriter,

	writeEvent: function(e) {
		this.ws.send(JSON.stringify(e));
	},

	writeMessage: function(msg) {
		this.ws.send(JSON.stringify(msg));
	}
}

module.exports.ConsoleWriter = ConsoleWriter;
module.exports.WebSocketWriter = WebSocketWriter;
