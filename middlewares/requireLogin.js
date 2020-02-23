// next: a function that we call when our middleware is complete or all finished running
module.exports = (req, res, next) => {
	if (!req.user){
		return res.status(401).send({ error: 'You must log in!' });
	}

	next();
};
