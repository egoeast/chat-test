import React from 'react';
import {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Home from './Home';
import Login from './Login';
import Chat from './Chat/Chat';
import {BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";
import PrivateRoute from './PrivateRoute';

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
//import User from '../components/User'
//import Page from '../components/Page'
import * as chatActions from '../actions/ChatActions';
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
        //console.log(this);
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
                    <Route path="/login" render={() => (
                        !this.props.isAuthenticated ? (
                            <Login authUser={this.props.userActions.authUser}/>
                        ) : (
                            <Redirect to="/chat"/>
                        )
                    )}/>
                    {/*<PrivateRoute auth={this.state.isAuthenticated} path="/chat" redirectTo="/login" component={Chat} />*/}
                    <Route exact path="/chat" render={() => (
                        this.props.isAuthenticated ? (
                            <Chat
                                username={this.props.name} /*currentChannel={this.props.currentChannel} changeChannel={this.props.chatActions.changeChannel}*/
                            />
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
        axios.post('/api/logout')
            .then(
                (response) => {
                    let data = response.data;
                    console.log(response.data);
                    if (data.status === 200) {
                        //this.props.auth(true, data.username);
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
            });
    }
}

App.propTypes = {
    greeting: PropTypes.string
};

/*App.defaultProps = {
    greeting: 'Hi'
};*/

function mapStateToProps(state) {
    return {
        name: state.user.name,
        isAuthenticated: state.user.isAuthenticated,
        currentChannel: state.chat.currentChannel,

        //changeChannel: state.chat.changeChannel
    }
}

function mapDispatchToProps(dispatch) {
    return {
        //chatActions: bindActionCreators(chatActions, dispatch),
        userActions: bindActionCreators(userActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)