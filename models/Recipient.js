const mongoose = require('mongoose');
const { Schema } = mongoose; //Schema object

const recipientSchema = new Schema({
	email: String,
	responded: { type: Boolean, default: false }
});

module.exports = recipientSchema;