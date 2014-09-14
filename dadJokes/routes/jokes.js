var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
var errorUtil = require('../public/javascripts/errorUtil');
var jokeController = require('../modules/jokeController');
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
	/*var db = req.db;
	var collection = db.get('jokes');
	collection.find({},{},function(e,docs)
	{
       res.render('jokelist', { "jokes" : docs });
    });*/
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

/*if(ObjectID.isValid(req.query.jokeid))
{
     var db = req.db
     db.get('jokes').findOne({"_id": new ObjectID(req.query.jokeid) }, function(err, doc_joke)
     {
        if(err)
        {
		   errorUtil.renderError(res, "Ooops!");
		   //Don't expose user to error message but log it to the console
		   console.log(err.err)
		}
		else if(doc_joke)
		{
		   //Everything is good, render the joke
		   res.render('joke', doc_joke );
	    }
	    else
	    {
		   //A valid id was provided but the joke doesn't exist anymore
		   errorUtil.renderError(res, "The joke you are looking for seems to be missing");
		}

      });
 }
 else
 {
    //a bad id, likely typed in the address bar
    errorUtil.renderError(res, "The joke you are looking for seems to be missing");
 }*/

});

module.exports = router;
