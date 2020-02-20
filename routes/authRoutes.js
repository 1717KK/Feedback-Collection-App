const passport = require('passport');

module.exports = app => {
	// add a single route handler
	// Use passport.authenticate() as route middleware to authenticate the
	// request.
	// first argument is the path that we want to handle
	// second argument is some code to be executed whenever a request comes
	// in to this route with this request type (use googleStrategy)
	app.get(
		'/auth/google', 
		passport.authenticate('google', {
			scope: ['profile', 'email']
		})
	);

	//add a second route handler to handle the case in which a user visits /auth/google/callback
	app.get('/auth/google/callback', passport.authenticate('google'));

	app.get('/api/logout', (req, res) => {
		req.logout(); // kill the cookie
		res.send(req.user); // prove the user no longer signed in
	});

	//the third route handler: get request and send result
	//incoming request and outgoing result
	app.get('/api/current_user', (req, res) => {
		//res.send(req.session);
		res.send(req.user);
	});
};