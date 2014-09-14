var monk = require('monk');
var db = monk('localhost:27017/dadJoke');
var ObjectID = require('mongodb').ObjectID;
var users = db.get('users');
console.log("Setup Users Connection");


/**
Returns a user if it exists, or null if it does not
@param {String} userName - the submitted username
@param {String} password - the submitted password
@param {Function} callback(err, doc_user) - called after the user is retrieved
	@param {String} err - The error message or null if no error
	@param {JSON} doc_user - the user corresponding with that username/password
	combination, or null if not a valid login
**/
var getUser = function(userName, password, callback) {
	users.findOne({ "username" : userName }, function(err, doc_user) {
		if(err) {
			callback(err,null)
		}
		else if(doc_user) {
			//TODO - simulating a wrong password with hardcoded "bad".
			//Impliment real solution
			if(password == "bad") {
				callback("Bad password", null);
			}
			else {
				callback(null, doc_user);
			}
		}
		else {
			callback("No user found",null);
		}
	});
}

/**
Takes a user name and password and returns a user if the user name/password
matches, or null if not
TODO - currently password is ignored (with exception of hardcoded "bad" case)
and just checks to see if the user exists impliment password
@param {String} userName - the submitted username
@param {String} password - the submitted password
@param {Function} callback(err, doc_user) - called after the user is retrieved
	@param {String} err - The error message or null if no error
	@param {JSON} doc_user - the user corresponding with that username/password
	combination, or null if not a valid login
**/
exports.loginUser = function(user, password, callback) {
	getUser(user, password, callback);
}