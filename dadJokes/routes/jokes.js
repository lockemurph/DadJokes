var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;

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


       var db = req.db
       db.get('jokes').findOne({"_id": new ObjectID(req.query.jokeid) }, function(err, doc_joke)
       {
	      console.log(req.query.jokeid);
	      res.render('joke', doc_joke );
	      //res.render('joke', {"setup": "Hello Bob"} );
	   });

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
