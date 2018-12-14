import React from 'react';
import {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Home from './Home';
import Login from './Login';
import Chat from './Chat/Chat';
import {BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as userActions from '../actions/UserActions';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            message: "Hello",
            username: "Guest"
        };
    }

    componentDidMount() {
        axios.get('/api/')
            .then(
                (response) => {
                    let user = response.data.user;
                    if (user) {
                        this.props.userActions.authUser(user.username);
                    } else {
                        /*this.setState({
                            message: 'Error'
                        });*/
                    }
                }
            )
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <Router>
                <div>
                    <h2>Hi, {this.props.name}</h2>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            {!this.props.isAuthenticated ?
                                <Link to="/login">Login</Link>
                                :
                                <a onClick={this.props.userActions.logOut}>Logout </a>
                            }
                        </li>
                        <li>
                            <Link to="/chat">Chat</Link>
                        </li>

                    </ul>
                    <hr/>
                    <h1 className="display-3">{this.props.parent}</h1>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/chat" render={() => (
                        this.props.isAuthenticated ? (
                            <Chat
                                username={this.props.name}
                            />
                        ) : (
                            <Redirect to="/login"/>
                        )
                    )}/>
                    <Route path="/login" render={() => (
                        !this.props.isAuthenticated ? (
                            <Login authUser={this.props.userActions.authUser}/>
                        ) : (
                            <Redirect to="/chat"/>
                        )
                    )}/>

                </div>

            </Router>
        )
    }

    logOut() {
        /*axios.post('/api/logout')
            .then(
                (response) => {
                    let data = response.data;
                    console.log(response.data);
                    if (data.status === 200) {
                        this.setState({
                            isAuthenticated: false,
                            username: 'Guest',
                            message: data.text
                        })
                    } else {
                        this.setState({
                            message: data.text
                        });
                    }
                }
            )
            .catch((error) => {
                console.log(error);
            });*/
    }
}

App.propTypes = {
    greeting: PropTypes.string
};

function mapStateToProps(state) {
    return {
        name: state.user.name,
        isAuthenticated: state.user.isAuthenticated,
        currentChannel: state.chat.currentChannel,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)