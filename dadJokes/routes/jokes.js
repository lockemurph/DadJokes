var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
var errorUtil = require('../modules/errorUtil');
var jokeController = require('../modules/jokeModel');

/* GET a list of jokes */
router.get('/jokelist', function(req, res) {
	jokeController.getJokeList(function(jokeList) {
		if(jokeList) {
			res.render('jokelist', { "jokes" : jokeList });
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

		}
	});
});

/* GET form submitting a joke. */
router.get('/newJoke', function(req, res) {
	res.render('newJoke', {} );
});

router.post('/submitJoke', function(req, res) {
	var sess = req.session;
	jokeController.submitJoke(sess.user, sess.password, req.body.setup, req.body.punchline, function(err, joke_doc) {
		if(err) {
			errorUtil.renderError(res, "There was an error telling your joke");
		}
		else {
			res.redirect('../jokes?jokeid=' + joke_doc._id );
		}
	});
});


/* POST Comment on a joke */
router.post('/newComment', function(req, res) {
	var sess = req.session;
	jokeController.submitComment(sess.user,sess.password,req.body.jokeid, req.body.comment, function(err, success){
		if(success){
			res.redirect('../jokes?jokeid=' + req.body.jokeid );
		}
		else {
			errorUtil.renderError(res, err);
		}
	});
});

module.exports = router;
