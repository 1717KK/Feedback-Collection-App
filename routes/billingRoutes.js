const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
	app.post('/api/stripe', requireLogin, async (req, res) =>{
		// console.log(req.body); // communicate the request body into request handler
		
		const charge = await stripe.charges.create({
			amount: 500,
			currency: 'usd',
			description: '$5 for 5 credits',
			source: req.body.id
		});

		// respond to the request with the newly updated user model
		req.user.credits += 5;
		const user = await req.user.save();

		res.send(user);
	});
};