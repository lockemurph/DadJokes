var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
var mongoUtil = require('../public/javascripts/mongoUtil');
var errorUtil = require('../public/javascripts/errorUtil');

router.get('/jokelist', function(req, res) {

	var db = req.db;
	var collection = db.get('jokes');
	collection.find({},{},function(e,docs)
	{
       res.render('jokelist', { "jokes" : docs });
    });



});


/* GET users listing. */
router.get('/', function(req, res) {

/*mongoUtil.validateId(req.query.jokeid, function(err, data) {
	console.log(data);
	if(data)
	{
	   res.render('joke', doc_joke );
    }
    else
    {
		errorUtil.renderError(res, "No Valid Id");
	}

	});*/


mongoUtil.validateId(req.query.jokeid, function(isValid) {
	if(isValid)
	{
		console.log("True");
		errorUtil.renderError(res, "No Valid Id");

	}
	else
	{
		console.log("False");
			errorUtil.renderError(res, "No Valid Id");
	}


});

/*if(mongoUtil.validateId(req.query.jokeid))
{
     var db = req.db
     db.get('jokes').findOne({"_id": new ObjectID(req.query.jokeid) }, function(err, doc_joke)
     {
        console.log(mongoUtil.validateId(req.query.jokeid));
        res.render('joke', doc_joke );
       //res.render('joke', {"setup": "Hello Bob"} );
      });
 }
 else
 {
    errorUtil.renderError(res, "No Valid Id");
 }*/

 //           var db = req.db;
//		    var collection = db.get('jokes');
//		    collection.find({},{},function(e,docs){
//				var doc  = docs.next();
//		        res.render('joke', {
//		            "jokes" : docs
//		       });
//   });

        //  var db = req.db;
		  //  var collection = db.get('users');
		 //   var joke = collection.findOne();
		 //   console.log(joke.username);
		//    res.render('joke', joke);

//		    collection.findOne({},{},function(e,docs){//
		        //res.render('joke', {
		        //    "joke" : docs
		      // });
   //});

 //       #res.render('joke', {
 //       #    "joke" : { "setup": "A test joke" }
       //});
});

module.exports = router;
