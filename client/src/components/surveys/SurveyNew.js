// SurveyNew shows SurveyForm and SurveyReview
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
	state = { showFormReivew: false };

	renderContent() {
		if (this.state.showFormReivew) {
			return (
				<SurveyFormReview 
					onCancel={() => this.setState({ showFormReivew: false})}
				/>
			);
		}
		return <SurveyForm onSurveySubmit={() => this.setState({ showFormReivew: true})} />;
	}

	render() {
		return (
			<div>
				{this.renderContent()}
			</div>
		);
	}
}

export default reduxForm({
	form: 'SurveyForm'
})(SurveyNew);