const express = require('express');
const mongoose = require('mongoose');
// enable cookies in the first place and get express to care about them at all
// enable us to get access to cookies
const cookieSession= require('cookie-session');
// tell passport to keep track of user authentication state 
// for lack of a better term by using cookies
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./models/Survey');
require('./services/passport');

// connect to mongoDB
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

// create an express application
const app = express();

app.use(bodyParser.json());

// tell express that it needs to make use of cookies inside of our application
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,// how long this cookie can exist inside the browser before it is automatically expired = 30days
		keys: [keys.cookieKey]// a key that will be used to encrypt our cookie
	})
);

//tell passport to use cookies to handle authentication
app.use(passport.initialize());
app.use(passport.session());

//return a function and immediately call this function with the express app object
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production'){
	// Express will serve up production assets
	// like our main.js file, or main.css file
	app.use(express.static('client/build'));

	// Express will serve up the index.html file
	// if it doesn't recognize the route
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

//dynamically find which port we should listen to
const PORT = process.env.PORT || 5000;
app.listen(PORT); 
