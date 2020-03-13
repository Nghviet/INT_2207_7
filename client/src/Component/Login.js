import React, {Component} from 'react';
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email : '',
            password:'',
            token : ''
        }
        this.token = null;
        this.onChange = this.onChange.bind(this);
        this.onSubmitLogin = this.onSubmitLogin.bind(this);
    }

    //Login and Signin

    onChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    }
    onSubmitLogin(e) {
        e.preventDefault();
        axios.post('API/login',this.state).then((res) => {
            console.log(this.state);
            console.log(res);
            if(res.data.code === 1) {
                this.token = res.data.token;
                this.setState({token : res.data.token});
                console.log("Login complete with " + this.token);
                this.props.checkLogin(true);
            }
        });
    }

    //Render
    render() {
        let view = '';
        if(this.token === null) {
            view =     
            <div class = "login">
                <form onSubmit = {this.onSubmitLogin} className = "form" class= "w3-container w3-card-4">
                    <label> Email </label>
                    <input type = "email" name = "email" onChange = {this.onChange} className = "input" />
                    <label> Password </label>
                    <input type = "password" name = "password" onChange = {this.onChange} className = " input" />
                    <button type = "submit"> Submit </button>
                </form> 
            </div>;
        }
        else {
            view = <div> Welcome to Facebook </div>;
        }

        return view;
    }
}

export default Login;