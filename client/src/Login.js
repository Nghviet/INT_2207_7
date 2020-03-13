import React, {Component} from 'react';
import logo from '/logo.svg';

import './app.css';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			'email' : '',
			'password':''
		}
	}

	onChangeEmail(e) {
		var trans = state;
		trans.email = e.target.value;
		this.setState(trans);
	}

	onChangePassword(e) {
		var trans = state;
		trans.password = e.target.value;
		this.setState(trans);
	}

	onSubmit(e) {
		e.preventDefault();
	}

	render() {
		return (
			<form onSubmit = {this.onSubmit) className = "form">
				<label> Email </label>
				<input type = "email" name = "email" onChange = {this.onChangeEmail} className = "input" />
				<label> Password </label>
				<input type = "password" name = "password" onChange = {this.onchangePassword} className = " input" />
				<button type = "submit"> Submit </button>
			</form> 
		);
	}


}

export default Login