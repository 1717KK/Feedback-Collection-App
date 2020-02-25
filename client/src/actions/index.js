import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
	const res = await axios.get('/api/current_user')

	dispatch({ type: FETCH_USER, payload: res.data });
};

// a new action creator: will be called with the token that we
// just got back from Stripe API
export const handleToken = token => async dispatch => {
	// make a post request to our back end server and we've gotten a response
	const res = await axios.post('/api/stripe', token);
	
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (values, history) =>async dispatch => {
	const res = await axios.post('/api/surveys', values);

	// redirect to '/surveys'
	history.push('/surveys');
	dispatch({ type: FETCH_USER, payload: res.data });
};