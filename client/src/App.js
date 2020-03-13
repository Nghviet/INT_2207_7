import React, {Component} from 'react';
import './App.css';
import Login from './Component/Login'
import Signin from './Component/Signin'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logged : false
        }
    }

    checkLogin = (logged) => {
        if(logged === true)
        this.setState({
            logged : true
        });
    }

    checkSignin = (success) => {
        if(success === true) {
            this.setState ({
                logged : true
            });
        }
    }


    render() {
        if(this.state.logged === true) {
            return(
            <div>
                Welcome to FACEBOOK APP
            </div>);
        }
        else {
            return (
            <div classname = "App"> 
                <div id = "login"> < Login checkLogin = {this.checkLogin} /> </div>
                <div id = "signin"> < Signin checkSignin = {this.checkSignin} /> </div>
            </div>
            );
        }
    }
}

export default App;
