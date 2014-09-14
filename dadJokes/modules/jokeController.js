var monk = require('monk');
var db = monk('localhost:27017/dadJoke');
var ObjectID = require('mongodb').ObjectID;
var jokes = db.get('jokes');
console.log("Setup Joke Connection");

var validateId = function(jokeId, callback)
{
	if(ObjectID.isValid(jokeId))
	{
		callback(jokeId);
	}
	else
	{
		callback(null);
	}
}

exports.getJokeList = function(callback) {
	jokes.find({},{},function(err,docs){
		if(err) {
			callback(null);
		}
		else if(docs) {
			callback(docs);
		}
		else {
			callback(null);
		}
    });
}

exports.getJoke = function(jokeId, callback) {
	validateId(jokeId, function(jokeId) {
		if(jokeId){
			jokes.findOne({"_id": new ObjectID(jokeId) }, function(err, doc_joke) {
				if(err) {
					callback(null);
				}
				else if(doc_joke){
					callback(doc_joke);
				}
				else {
					callback(null);
				}
			});
		}
		else {
			callback(null);
		}
	});
}

