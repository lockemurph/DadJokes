var util = require('util');
var events = require('events');
var eventEmitter = new events.EventEmitter();
var ObjectID = require('mongodb').ObjectID;

function jokePage(jokeid) {


	function _getJoke(error, data){
		if(data)
		{
			console.log("true");
			eventEmitter.emit('success', data);
		}
		else
		{
			console.log("false");
			eventEmitter.emit('success', data);
		}
	}

	function tellJoke() {
		ObjectID.isValid(jokeid, _getJoke);
	}

	this.tellJoke = tellJoke
}

