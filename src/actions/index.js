import axios from 'axios';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE } from './types';

const ROOT_URL = 'http://127.0.0.1:3090';

export const signinUser = ({ email, password }, history) => {
	// submit email/password of the server

	return function(dispatch) {
		axios.post(`${ROOT_URL}/signin`, { email, password })
		.then((response) => {
			dispatch({ type: AUTH_USER });
			localStorage.setItem('token', response.data.token);
			history.push('/feature');
		})
		.catch((response) => {
			dispatch(authError('Bad login Info'));
		});
	}
	// If request is good...
	// - Update state to indicate user is authenticated
	// - Save the JWT token
	// - redirect to the route '/feature'

	// If request is bad...
	// - Show an error to the user
}

export function authError(error) {
	return {
		type: AUTH_ERROR,
		payload: error
	}
}

export function signoutUser() {
	localStorage.removeItem('token');

	return {
		type: UNAUTH_USER
	}
}

export function signupUser({ email, password }, history) {

	return function(dispatch) {
		axios.post(`${ROOT_URL}/signup`, { email, password })
		.then((response) => {
			dispatch({ type: AUTH_USER });
			localStorage.setItem('token', response.data.token);
			history.push('/feature');
		})
		.catch((error) => {
			dispatch(authError(error.response.data.error));
		});
	}

}

export const fetchMessage = () => {
	return (dispatch) => {
		axios.get(`${ROOT_URL}`, {
			headers: { authorization: localStorage.getItem('token') }
		})
		.then(response => {
			dispatch({ type: FETCH_MESSAGE, payload: response.data.message });
		});
	}
}
