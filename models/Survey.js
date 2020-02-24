const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
	title: String,
	body: String,
	subject: String,
	recipients: [RecipientSchema], //an array of RecipientSchema records
	yes: { type: Number, default: 0},
	no: { type: Number, default: 0},
	// we add the idea to survey schema that every survey is going to belong to a very particular user
	_user: { type: Schema.Types.ObjectId, ref: 'User' }, // relationship field
	dateSent: Date,
	lastResponded: Date
});

mongoose.model('surveys', surveySchema);