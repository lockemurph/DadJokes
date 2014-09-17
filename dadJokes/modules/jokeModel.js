/*
jokeModel.js

Contains functions to get and set jokes
*/
var userModel = require('./userModel');
var monk = require('monk');
var db = monk('localhost:27017/dadJoke');
var ObjectID = require('mongodb').ObjectID;
var jokes = db.get('jokes');
console.log("Setup Joke Connection");


/**
Takes an id for a joke.  Calls callback with the valid id if the id is valid,
otherwise calls the callback with null
@param {String} jokeId - the id of the joke
@param {Function} callback(jokeId) - called after the id is validated
	@param {String} jokeId - a valid jokeId or null if the provided id is not valid
**/
var validateId = function(jokeId, callback){
	if(ObjectID.isValid(jokeId))
	{
		callback(jokeId);
	}
	else
	{
		callback(null);
	}
}

/**
Gets all the jokes
@param {Function} callback(jokes) - called after the jokes are retrieved
	@param {JSON} jokes - All the jokes or null if there are no jokes
	or an error
**/
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

/**
Gets a joke with the specified id
@param {String} jokeId - the id of the joke
@param {Function} callback(joke) - called after the joke is retrieved
	@param {JSON} joke - the joke or null if an error occurs or there
	is no joke of the provided id
**/
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

/**
Adds a comment to a joke.  Should be called after user has been verfied
@param {String} jokeId - the id of the joke to add a comment to
@param {String} comment - the text of the comment being added
@param {String} userName - the name of the user adding the comment
@param {Function} callback(error, success) - called after the comment has been
added to the joke, or failed to be added to the joke
	@param {String} error - An error string
	@param {boolean} success - true if the add was successful, false if the add
	not
**/
var addCommentToJoke = function(jokeId, comment, userName, callback) {
	validateId(jokeId, function(jokeId) {
		if(jokeId) {
			jokes.update({_id:  new ObjectID(jokeId)}, {$push: { comments: {user: userName, text: comment}}}, function(err,joke_doc){
				if(err){
					callback(err,false);
				}
				else {
					callback(null,true);
				}
			});
		}
		else {
			callback("Bad Joke Id", false);
		}
	});
}
/**
Attempts to add a comment to a joke.  Verfies if the user is valid, and if
the user is valid, attempt to add the comment to the joke
@param {String} user - the username of the user adding the comment
@param {String} password - the password for the username provided
@param {String} jokeId - id of the joke to be updated
@param {String} comment - text of the comment to be added
@param {Function} callback(error, success) - called after the comment has been
added to the joke, or failed to be added to the joke
	@param {String} error - An error string
	@param {boolean} success - true if the add was successful, false if the add
	not
**/
exports.submitComment = function(user, password, jokeId, comment, callback) {
	userModel.loginUser(user,password,function(err,doc_user) {
		if(err)	{
			callback(err,false);
		}
		else if(doc_user) {
			addCommentToJoke(jokeId, comment, doc_user.username, callback);
		}
		else {
			callback("Please log in",false);
		}
	});
}

var validateJoke = function(setup, punchline, callback) {
	//TODO - impliment checks like length, word filter, etc
	callback(true);
}

var addJoke = function(setup, punchline, callback) {
	validateJoke(setup, punchline, function(valid) {
		if(valid) {
			jokes.insert({setup: setup, punchline: punchline, comments:[ ]}, function(err,joke_doc){
				if(err){
					callback(err,null);
				}
				else {
					callback(null,joke_doc);
				}
			});
		}
		else {
			callback("Unable to insert joke", null);
		}
	});
}

exports.submitJoke = function(user, password, setup, punchline, callback) {
	userModel.loginUser(user,password,function(err,doc_user) {
		if(err)	{
			callback(err,false);
		}
		else if(doc_user) {
			addJoke(setup, punchline, callback);
		}
		else {
			callback("Please log in",false);
		}
	});
}

