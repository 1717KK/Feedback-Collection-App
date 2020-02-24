const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

// helper.Mail: an object that takes a lot of configuration and splits out a mailer
class Mailer extends helper.Mail {
	// recipients: from survey instance
	constructor({ subject, recipients }, content){
		super();

		this.sgApi = sendgrid(keys.sendGridKey);

		this.from_email = new helper.Email('no-reply@emaily.com');
		this.subject = subject;
		// first argument: indicates that this is going to be some HTML mail that we want to show on the body of the email
		// second argument: output of our email template that we passed in
		this.body = new helper.Content('text/html', content);
		this.recipients = this.formatAddresses(recipients);

		this.addContent(this.body); //built-in function in helper.Mail
		this.addClickTracking();
		// take the formatted list and somehow register it with the actual email
		this.addRecipients();
	}

	formatAddresses(recipients) {
		return recipients.map(({ email }) => {
			return new helper.Email(email);
		});
	}

	addClickTracking() {
		const trackingSettings = new helper.TrackingSettings();
		const clickTracking = new helper.ClickTracking(true, true);

		trackingSettings.setClickTracking(clickTracking);
		this.addTrackingSettings(trackingSettings);
	}

	addRecipients() {
		// we're going to iterate over our list of recipients that we have assigned to this recipients
		// and for each recipient, we will make use of this personalized objects that we've just declared
		const personalize = new helper.Personalization();
		this.recipients.forEach(recipient => {
			personalize.addTo(recipient);
		});
		// for each one of those, take them and add them to the personalized object
		this.addPersonalization(personalize);

	}

	// send email to sendgrid
	async send() {
		const request = this.sgApi.emptyRequest({
			method: 'POST',
			path: '/v3/mail/send',
			body: this.toJSON()
		});

		const response = this.sgApi.API(request);
		return response;
	}
}

module.exports = Mailer;