import React, {Component} from 'react';
import axios from 'axios';

class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email : '',
            password :'',
            username :'',
            token: ''
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(evt) {
    this.setState({
            [evt.target.name]: evt.target.value
        });
    }

    onSubmit(evt) {
        evt.preventDefault();
        axios.post('API/signup',this.state)
        .then( (res) => {
            console.log(res);
            if(res.data.code === 1) {
                this.setState({token : res.data.token});
                this.props.checkSignin(true);
            }
        })
        .catch((err =>{
            console.log(err);
        }));
    }

    render() {
    let view =      
        <form onSubmit = {this.onSubmit} className = "form">
            <label> Email </label>
            <input type = "email" name = "email" onChange = {this.onChange} className = "input" />
            <label> Password </label>
            <input type = "password" name = "password" onChange = {this.onChange} className = " input" />
            <label> Username </label>
            <input type = "text" name = "username" onChange = {this.onChange} className = "input" />
            <button type = "submit"> Submit </button>
        </form> ;
    return view
    }
}

export default Signin