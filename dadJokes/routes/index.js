var express = require('express');
var router = express.Router();
var jokeModel = require('../modules/jokeModel');

/* GET home page. */
router.get('/', function(req, res) {
		res.render('index', { title: 'Welcome to Dad Jokes'});	
});

module.exports = router;
