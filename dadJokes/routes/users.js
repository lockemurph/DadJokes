var express = require('express');
var router = express.Router();
var userModel = require('../modules/userModel');

/* GET users listing. */
router.get('/', function(req, res) {
   res.render('newuser', { title: 'Add New User' });
});

router.post('/logout', function(req, res) {
	var sess = req.session;
	sess.destroy();
	res.render('authuser', { title: 'Login' });
});

router.post('/adduser', function(req, res) {
//TODO - impliment adding a new user
	console.log(req.body.username);
	res.render('newuser', { title: 'Add New User' });
});

/**
Post for logging in
**/
router.post('/authuser', function(req, res) {
	userModel.loginUser(req.body.username, req.body.password, function(err, validLogin){
		if(validLogin) {
			var sess = req.session;
			sess.user = validLogin.username;
			//TODO - actual password support
			sess.password = "goodpass";
			res.redirect('../jokes/jokelist');
		}
		else {
			res.render('authuser', { title: 'Login', error: err });
		}
	});
});

module.exports = router;
