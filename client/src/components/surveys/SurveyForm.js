// SurveyForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
// reduxForm function allows our component to communicate with the redux store at the top of our application that is enclosed by that provider tag
// field: a helper provided by redux form for rendering absolutely any type of traditional HTML form
import { reduxForm, Field } from 'redux-form'; 
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
	renderFields() {
		return _.map(formFields, ({ label, name }) => {
			return (<Field key={name} component={SurveyField} type="text" label={label} name={name} />);
		});
	}

	render() {
		return (
			<div>
				{/* props.handleSubmit: is provided to us automatically by the redux form helper that we wired up at the bottom */}
				<form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
					{/* name: tells redux form that we have one piece of data being produced by our form called surveyTitle */}
					{this.renderFields()}
					<Link to="/surveys" className="teal btn-flat white-text">
						Cancel
					</Link>
					<button type="submit" className="orange btn-flat right white-text">
						Next
						<i className="material-icons right">done</i>
					</button>
				</form>
			</div>
		);
	}
}

function validate(values) {
	const errors = {};

	errors.emails = validateEmails(values.emails || '');

	_.each(formFields, ({ name, noValueError }) => {
		if (!values[name]) {
			errors[name] = noValueError;
		}
	});


	return errors;
}

export default reduxForm({
	validate,
	form: 'SurveyForm',
	destroyOnUnmount: false
})(SurveyForm);