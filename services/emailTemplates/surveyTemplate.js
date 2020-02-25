const keys = require('../../config/keys');

// return some email to be used as the body of any survey email that our application sent out
module.exports = (survey) => {
	// contain all the actual HTML mail that will be displayed inside of any email we send out
	return `
		<html>
			<body>
				<div style="text-align: center;">
					<h3>I'd like your input!</h3>
					<p>Please answer the following question:</p>
					<p>${survey.body}</p>
					<div>
						<a href="${keys.redirectDomain}/api/surveys/thanks">Yes</a>
					</div>
					<div>
						<a href="${keys.redirectDomain}/api/surveys/thanks">No</a>
					</div>
				</div>
			</body>
		</html>
	`;
};