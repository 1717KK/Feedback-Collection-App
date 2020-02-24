// return some email to be used as the body of any survey email that our application sent out
module.exports = (survey) => {
	// contain all the actual HTML mail that will be displayed inside of any email we send out
	return '<div>' + survey.body + '</div>';
};