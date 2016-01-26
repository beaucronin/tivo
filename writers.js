var ConsoleWriter = function() {

}

ConsoleWriter.prototype = {
	constructor: ConsoleWriter,

	writeEvent: function(e) {
		console.log(e.__event_date.toString());
	}
}

module.exports.ConsoleWriter = ConsoleWriter;
