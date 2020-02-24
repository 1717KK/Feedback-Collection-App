const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
	// make sure if the user is logged in
	// if you are logged in -> check if you have enough credits on hand
	app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
		const { title, subject, body, recipients } = req.body;

		//an instance of survey
		const survey = new Survey({
			title,
			subject,
			body,
			recipients: recipients.split(',').map(email => { email.trim() }),
			_user: req.user.id,
			dateSent: Date.now()
		});

	// Great place to send an email
	const mailer = new Mailer(survey, surveyTemplate(survey));
	mailer.send();
	});
};