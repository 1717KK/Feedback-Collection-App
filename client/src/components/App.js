import React from 'react';
// BrowserRouter: tells react router how to behave
// Route: used to set up a rule between a certain route that the user might visit inside an application
// and a set of components that will be actually visible on the screen
import { BrowserRouter, Route } from 'react-router-dom';

//const Header = () => <h2>Header</h2>
import Header from './Header';
const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>
const Landing = () => <h2>Landing</h2>


const App = () => {
	return (
		<div className = "container">
			<BrowserRouter>
				<div>
					<Header />
					<Route exact path = "/" component = {Landing} />
					<Route exact path = "/surveys" component = {Dashboard}/>
					<Route path = "/surveys/new" component = {SurveyNew}/>
				</div>
			</BrowserRouter>
		</div>
	);
};

export default App;