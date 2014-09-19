var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
var errorUtil = require('../modules/errorUtil');
var jokeModel = require('../modules/jokeModel');

/* GET a list of jokes */
router.get('/jokelist', function(req, res) {
	jokeModel.getJokeList(function(jokeList) {
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
	jokeModel.getJoke(req.query.jokeid, function(jokeDoc) {
		if(jokeDoc) {
			res.render('joke', jokeDoc );
		}
		else {
			errorUtil.renderError(res, "The joke you are looking for seems to be missing");
		}
	});
});

/* Gets the latest joke, for the latest joke box */
router.get('/latest', function(req, res) {
	jokeModel.getLatestJoke(function(jokeDoc) {
		if(jokeDoc) {
			res.render('latestJoke', jokeDoc );
		}
		else {
			errorUtil.renderError(res, "The jokes you are looking for seems to be missing");
		}
	});
});



/* GET form submitting a joke. */
router.get('/newJoke', function(req, res) {
	res.render('newJoke', {} );
});

router.post('/submitJoke', function(req, res) {
	var sess = req.session;
	jokeModel.submitJoke(sess.user, sess.password, req.body.setup, req.body.punchline, function(err, joke_doc) {
		if(err) {
			res.end(JSON.stringify({error: err}));
		}
		else {
			res.end(JSON.stringify(joke_doc));
		}
	});
});


/* POST Comment on a joke */
router.post('/newComment', function(req, res) {
	var sess = req.session;
	jokeModel.submitComment(sess.user,sess.password,req.body.jokeid, req.body.comment, function(err, success){
		if(success){
			res.redirect('../jokes?jokeid=' + req.body.jokeid );
		}
		else {
			errorUtil.renderError(res, err);
		}
	});
});

module.exports = router;
