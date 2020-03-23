import React, {Component} from 'react';
import './App.css';

import Gate from './Gate';
import Main from './Main';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id : localStorage.getItem('id'),
            name : localStorage.getItem('name')
        }
    }



    changeState = (id,name) => {
        if(id != null) this.setState({id : id,name:name});
        localStorage.setItem('id',id);
        localStorage.setItem('name',name);
    }

    logOut = () => {
        localStorage.removeItem('id');
        localStorage.removeItem('name');
        this.setState({id:null,name:null});
    }

    render() {
        if(this.state.id != null) {
            return(
                <Main userID = {this.state.id} name = {this.state.name} logOut = {this.logOut}/>
            );
        }
        else {
            return (
                <Gate changeState = {this.changeState} />
            );
        }
    }
}

export default App;
