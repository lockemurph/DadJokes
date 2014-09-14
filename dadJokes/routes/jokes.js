var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
var errorUtil = require('../modules/errorUtil');
var jokeController = require('../modules/jokeModel');

/* GET a list of jokes */
router.get('/jokelist', function(req, res) {
	console.log(req.session.user + "has looked at the jokes");
	jokeController.getJokeList(function(jokeList) {
		if(jokeList) {
			res.render('jokelist', { "jokes" : jokeList });
			//console.log(req.session.loggedIn);
		}
		else {
			errorUtil.renderError(res, "The jokes you are looking for seems to be missing");
		}

	});
});

/* GET a joke. */
router.get('/', function(req, res) {
	jokeController.getJoke(req.query.jokeid, function(jokeDoc) {
		if(jokeDoc) {
			res.render('joke', jokeDoc );
		}
		else {
			errorUtil.renderError(res, "The joke you are looking for seems to be missing");
		}
	});
});

/* Comment on a joke */
router.post('/newComment', function(req, res) {
	//console.log("Take a look at the reques" + req.body.comment);
	jokeController.submitComment("test1","test",req.body.jokeid, req.body.comment, function(){
		res.redirect('../jokes?jokeid=' + req.body.jokeid );
		});


});

module.exports = router;
