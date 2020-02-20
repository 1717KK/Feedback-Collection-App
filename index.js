const express = require('express');
const mongoose = require('mongoose');
// enable cookies in the first place and get express to care about them at all
// enable us to get access to cookies
const cookieSession= require('cookie-session');
// tell passport to keep track of user authentication state 
// for lack of a better term by using cookies
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

// connect to mongoDB
mongoose.connect(keys.mongoURI);

// create an express application
const app = express();

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

//return a function and immediately call this function with the app object
require('./routes/authRoutes')(app);

//dynamically find which port we should listen to
const PORT = process.env.PORT || 5000;
app.listen(PORT); 
