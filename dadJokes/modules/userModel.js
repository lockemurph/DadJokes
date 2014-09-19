var monk = require('monk');
var db = monk('localhost:27017/dadJoke');
var ObjectID = require('mongodb').ObjectID;
var users = db.get('users');
var bcrypt = require('bcrypt');
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
			bcrypt.compare(password, doc_user.password, function(err, res) {
				if(res) {
					callback(null, doc_user);
				}
				else {
					callback("Bad password", null);
				}			
			});		
		}
		else {
			callback("No user found",null);
		}
	});
}

/**
 * Adds a user to the database.  Throws an error if the username already exists
 * MongoDB has a ensuredIndex unique on the username as well
 * @param {String} username - the username to be added
 * @param {String} password - the password the user submitted.  Will be hashed
 * stored in the db
 * @param {Function} callback(err, doc_user) called after the user is inserted 
 * successfully or an error occurs.
 * 		@param {String} err - an error message or null if no error happened
 * 		@param {JSON} doc_user - the user that was inserted
 */
var addUser = function(userName, password, callback) {
	users.findOne({ "username" : userName }, function(err, doc_user) {
		if(err) {
			console.log(err)
			callback(err, null)
		}
		else if(doc_user) {
			callback("This username is taken", null)
		}
		else {
			bcrypt.genSalt(10, function(err, salt) {
				bcrypt.hash(password, salt, function(err, hash) {
					users.insert( {username: userName, password: hash}, callback)
				});
			});		
		}			
	});
}

/** Adds a user to the database.  Throws an error if the username already exists
* MongoDB has a ensuredIndex unique on the username as well
* @param {String} username - the username to be added
* @param {String} password - the password the user submitted.  Will be hashed
* stored in the db
* @param {Function} callback(err, doc_user) called after the user is inserted 
* successfully or an error occurs.
* 		@param {String} err - an error message or null if no error happened
* 		@param {JSON} doc_user - the user that was inserted
*/
exports.addNewUser = function(user, password, callback) {
	addUser(user, password, callback)
}

/**
Takes a user name and password and returns a user if the user name/password
matches, or null if not
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