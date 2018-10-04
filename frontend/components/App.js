import React from 'react';
import {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Home from './Home';
import Login from './Login';
import Chat from './Chat';
import {BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";
import PrivateRoute from './PrivateRoute';

class App extends Component {


    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            message: "Hello",
            username: "Guest"
        };
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('updated');
    }

    render() {

        return (
            <Router>
                <div>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            {!this.state.isAuthenticated ?
                                <Link to="/login">Login</Link>
                                :
                                <a onClick={this.logOut.bind(this)}>Logout </a>
                            }
                        </li>
                        <li>
                            <Link to="/chat">Chat</Link>
                        </li>
                    </ul>
                    <hr/>
                    <h1 className="display-3">{this.props.parent}</h1>
                    <h1>{this.state.message} , {this.state.username}</h1>
                    <Route exact path="/" component={Home}/>
                    <Route path="/login" render={() => (
                        !this.state.isAuthenticated ? (
                            <Login auth={this.setAuth.bind(this)}/>
                        ) : (
                            <Redirect to="/chat"/>
                        )
                    )}/>
                    {/*<PrivateRoute auth={this.state.isAuthenticated} path="/chat" redirectTo="/login" component={Chat} />*/}
                    <Route exact path="/chat" render={() => (
                        this.state.isAuthenticated ? (
                            <Chat/>
                        ) : (
                            <Redirect to="/login"/>
                        )
                    )}/>

                </div>
            </Router>
        )
    }

    setAuth(status, username) {
        this.setState({
            isAuthenticated: status,
            username: username
        })
    }

    logOut() {
        this.setState({
            isAuthenticated: false,
            username: 'Guest'
        })
    }

}

App.propTypes = {
    greeting: PropTypes.string
};

/*App.defaultProps = {
    greeting: 'Hi'
};*/

export default App