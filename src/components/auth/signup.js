import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {
	handleFormSubmit(values) {
		// call action creator to sign up the user!!

		this.props.signupUser(values, this.props.history);
	}

	renderAlert() {
		if (this.props.errorMessage) {
			return (
				<div className="alert alert-danger">
					<strong>
						{ this.props.errorMessage }
					</strong>
				</div>
			);
		}
	}

	renderField(field) {

  	const { meta: { touched, error } } = field;

  	const className = `form-group ${ touched && error ? 'has-danger' : ''}`;

		return (
      <div className={ className }>
        <label>
          { field.label }
        </label>
        <input
          type={ field.type } className="form-control"
         {...field.input}
        />
        <div className="text-help">
					{ field.meta.touched ? field.meta.error : ''}
        </div>
      </div>
		);
	}

	render() {
		const { handleSubmit } = this.props
		return(
			<form onSubmit={ handleSubmit(this.handleFormSubmit.bind(this))}>
				<Field
					label="Email"
					name="email"
					component={ this.renderField }
				/>

				<Field
					label="Password"
					name="password"
					type="password"
					component={ this.renderField }
				/>

				<Field
					label="Confirm Password"
					name="confirm_password"
					type="password"
					component={ this.renderField }
				/>
				{ this.renderAlert() }
				<button type="submit" className="btn btn-primary">Sign Up</button>
			</form>
		);
	}
}

function validate({ email, password, confirm_password }) {
	const errors = {};

	if (!email) {
		errors.email = "Enter an email";
	}

	if (!password) {
		errors.password = "Enter an password";
	}

	if (!confirm_password) {
		errors.confirm_password = "Enter an confirm_password";
	}

	if (password !== confirm_password) {
		errors.password = "Passwords must match";
	}

	return errors;
}

const mapStateToProps = (state) => {
	return { errorMessage: state.auth.error };
}

export default reduxForm({
	validate,
	form: 'signup'
})(connect(mapStateToProps, actions)(Signup))
