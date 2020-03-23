import React ,{Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory
} from "react-router-dom";

import {
    Nav,
    Navbar,
    NavItem,
    Form,
    Button,
    FormControl
} from "react-bootstrap";

import './App.css';

import Newsfeed from './Component/Newsfeed';
import Search from './Component/Search';


class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userID : props.userID,
            name : props.name,
            keyword : "",
        };
        this.logOut = this.logOut.bind(this);

        const 
    }

    logOut = () => {
        this.setState({userID : null,name : null});
        this.props.logOut();
    }

    onSearch = (e) =>{
        e.preventDefault();
        if(e.target.elements[0].value != "") {
            this.setState({keyword : e.target.elements[0].value});
        }
        console.log(this.state);
        var history = useHistory();
        history.push('/search');
    }

    render() {
        return (
            <Router>
                <div >
                    <Navbar bg="primary" variant="dark">
                        <Navbar.Brand href="/">
                            <img alt="" src="./logo.svg" width="30" height="30" className="d-inline-block align-top"/>{' '}
                            Viet's
                        </Navbar.Brand>

                        <Nav className="mr-auto">
                            <Nav.Link href='/'> Home </Nav.Link>
                        </Nav>

                        <Button onClick = {this.logOut}> Logout</Button>
                        
                        <Form inline onSubmit = {this.onSearch} action = "/search?{this.inputSearch}" >
                            <FormControl inputRef = {input => {this.inputSearch = input;}} type="text" placeholder="Search" className="mr-sm-2 keyword" />
                            <Button variant="outline-light" type = "submit">Search</Button>
                        </Form>

                    </Navbar>
                </div>

                <Switch>
                    <Route path = "/search"> <div>post</div> </Route>
                    <Route path = "/"> <Newsfeed key = {this.state.userID} id = {this.state.userID} name = {this.state.name}/> </Route>    
                </Switch>
            </Router>
        );
    }
}

export default Main;