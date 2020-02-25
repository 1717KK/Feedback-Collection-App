import React, { Component } from 'react';
// BrowserRouter: tells react router how to behave
// Route: used to set up a rule between a certain route that the user might visit inside an application
// and a set of components that will be actually visible on the screen
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

class App extends Component{
	componentDidMount(){
		this.props.fetchUser();
	}

	render(){
		return (
			<div className = "container">
				<BrowserRouter>
					<div className="container">
						<Header />
						<Route exact path = "/" component = {Landing} />
						<Route exact path = "/surveys" component = {Dashboard}/>
						<Route path = "/surveys/new" component = {SurveyNew}/>
					</div>
				</BrowserRouter>
			</div>
		);
	}
};

export default connect(null, actions)(App);