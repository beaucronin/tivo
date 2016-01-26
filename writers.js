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

var WebSocketWriter = function(httpServer) {
	this.httpServer = httpServer;
	this.socketServer = new WebSocketServer({ server: this.httpServer });
}

WebSocketWriter.prototype = {
	constructor: WebSocketWriter,

	writeEvent: function(e) {

	},

	writeMessage: function(msg) {
		
	}
}

module.exports.ConsoleWriter = ConsoleWriter;
module.exports.WebSocketWriter = WebSocketWriter;
