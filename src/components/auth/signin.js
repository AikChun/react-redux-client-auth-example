import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signinUser } from '../../actions';

class Signin extends Component {
	handleFormSubmit(values) {
		this.props.signinUser(values, this.props.history);
	}

	renderField(field) {
		return (
      <div className="form-group">
        <label>
          { field.label }
        </label>
        <input
          type="text" className="form-control"
         {...field.input}
        />
        <div className="text-help">
					{ field.meta.touched ? field.meta.error : ''}
        </div>
      </div>
		);
	}

	renderAlert() {
		if (this.props.errorMessage) {
			return (
				<div className="alert alert-danger">
					<strong>
						Oops!
					</strong>
					{ this.props.errorMessage }
				</div>
			);
		}
	}

	render() {
		const { handleSubmit } = this.props;

		return (
			<form onSubmit={ handleSubmit(this.handleFormSubmit.bind(this)) }>
				<Field
					label="Email"
					name="email"
					component={ this.renderField }
				/>

				<div className="form-group">
					<label>
						Password:
					</label>
					<Field className="form-control" name="password" type="password" component="input"/>
				</div>

				{ this.renderAlert() }
				<button type="submit" className="btn btn-primary">Sign In</button>
			</form>
		);

	}
}

const mapStateToProps = (state) => {
	return { errorMessage: state.auth.error }
}

export default reduxForm({
  form: 'signin'
})
(
	connect(mapStateToProps, { signinUser })(Signin)
)
;
