const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

// one argument means we are trying to fetch something out of mongoose
const User = mongoose.model('users');

//first argument is user model = the user defined below
passport.serializeUser((user, done) => {
	//user.id: identifying piece of information that is going to identify the user 
	//and follow up requests (this id is in the mongoDB)(not the google profile id)
	done(null, user.id); 
});

passport.deserializeUser((id, done) => {
	User.findById(id)
		.then(user => {
			done(null, user);
		});

});

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback',
			proxy: true
		}, 
		// this arrow function is to take this identifying user information and save it
		// to our database
		async (accessToken, refreshToken, profile, done) => {
			// console.log('access token', accessToken); // allow us to reach back over to google 
			// console.log('refresh token', refreshToken); // allow us to refresh the access token
			// console.log('profile', profile);

			//one promise
			const existingUser = await User.findOne({googleId: profile.id})
			if(existingUser){
				//we already have a record with given profile ID
				return done(null, existingUser);
			} 

			// we don't have a user record with this ID, make a new record
			//second promise
			//save(): it will automatically take this record, this model instance
			//and it will save it to the database
			const user = await new User({ googleId: profile.id }).save()
			done(null, user);
		}
	)
);