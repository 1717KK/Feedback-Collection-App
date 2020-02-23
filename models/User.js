const mongoose = require('mongoose');
// the mongoose object has a property called Schema
// take that property and assign it to a new variable called Schema
const { Schema } = mongoose;

// mongoose wants to know all of the different properties that our record
// will have inside of our database
// Use the schema object(line 4) to create a schema for this new collection
// The schema will describe what every individual property personally every 
// individual record is going to look like
// this project is goint to describe every property we have
const userSchema = new Schema({
	googleId: String,
	credits: { type: Number, default: 0 }
});

// first argument: the name of the collection which is going to be users
// two arguments means we're trying to load something into it
mongoose.model('users', userSchema);