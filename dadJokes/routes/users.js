var express = require('express');
var router = express.Router();
var userModel = require('../modules/userModel');

/* GET users listing. */
router.get('/', function(req, res) {
   res.render('newuser', { title: 'Add New User' });
});
/**
 * POST for logging out
 **/
router.post('/logout', function(req, res) {
	var sess = req.session;
	sess.destroy();
	backURL=req.header('Referer')
	res.redirect(backURL);
});


/*POST a new user, then login as them if successful, or send and error **/
router.post('/adduser', function(req, res) {
	userModel.addNewUser(req.body.user, req.body.password, function(err, newLogin){
		if(err) {
			res.end(JSON.stringify({error: err}));
		}
		else {
			var sess = req.session;
			sess.user = newLogin.username;
			sess.password = req.body.password;
			res.end(JSON.stringify(newLogin));
		}
	});
});
/**
Post for logging in
**/
router.post('/authuser', function(req, res) {
	userModel.loginUser(req.body.username, req.body.password, function(err, validLogin){
		if(validLogin) {
			var sess = req.session;
			sess.user = validLogin.username;
			sess.password = req.body.password;
			backURL=req.header('Referer')
			res.redirect(backURL);
		}
		else {
			res.render('authuser', { title: 'Login', error: err });
		}
	});
});

module.exports = router;
