const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
	app.get('/api/surveys', requireLogin, async (req, res) => {
		const surveys = await Survey.find({ _user: req.user.id })
			.select({ recipients: false });

		res.send(surveys);
	});

	app.get('/api/surveys/:surveyId/:choice', (req, res) => {
		res.send('Thanks for voting!');
	});

	app.post('/api/surveys/webhooks', (req, res) => {
		const p = new Path('/api/surveys/:surveyId/:choice');

		_.chain(req.body)
			.map(({ email, url }) => {
				// extract the path from the URL
				const match = p.test(new URL(url).pathname);
				if (match) {
					return { email, surveyId: match.surveyId, choice: match.choice };
				}
			})
			// return only event objects 
			// and there will be no elements in there that are undefined
			.compact()
			// remove duplicates
			.uniqBy('email', 'surveyId')
			.each(({ surveyId, email, choice }) => {
				// find the survey collection and find the survey with this given id 
				// who has a recipient with a given email and has not yet responded to the survey
				Survey.updateOne({
					_id: surveyId,
					// find just the sub-document collection recipient that we care about
					recipients: {
						$elemMatch: { email: email, responded: false }
					}
				}, {
					// update the survey in mongoDB
					$inc: { [choice]: 1 }, // [choice] will be replaced with 'yes' or 'no'
					$set: { 'recipients.$.responded': true },
					lastResponded: new Date()
				}).exec(); // execute the query
			})
			.value();
		
		res.send({});
	});

	// make sure if the user is logged in
	// if you are logged in -> check if you have enough credits on hand
	app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
		const { title, subject, body, recipients } = req.body;

		//an instance of survey
		const survey = new Survey({
			title,
			subject,
			body,
			recipients: recipients.split(',').map(email => ({ email: email.trim() })),
			_user: req.user.id,
			dateSent: Date.now()
		});

		// Great place to send an email
		const mailer = new Mailer(survey, surveyTemplate(survey));

		try {
			await mailer.send();
			await survey.save();
			req.user.credits -= 1;
			const user = await req.user.save();

			// update the user model
			res.send(user);
		} catch (err) {
			res.status(422).send(err);
		}
	});
};