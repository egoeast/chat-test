import React from 'react';
import {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';


class Login extends Component {


    constructor(props) {
        super(props);

        this.state = {
            // isOpen: this.props.defaultOpen,
            clickCount: 0,
            message: "Hi",
            username: 'name',
            password: 'pass'
        };

        this.handleChangeLogin = this.handleChangeLogin.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);

    }

    componentDidMount() {
        let data = "Hi111";
        axios.get('/test/api')
            .then(
                response => data
            )
            .catch(function (error) {
                console.log(error);
            });
    }

    handleChangeLogin(event) {
        this.setState({username: event.target.value});
    }

    handleChangePassword(event) {
        this.setState({password: event.target.value});
    }

    render() {
        return (

            <div className="container">
                <div className="jumbotron">

                    <form>
                        <div className="form-group">
                            <label htmlFor="usr">Name:</label>
                            <input name={'username'} value={this.state.username} onChange={this.handleChangeLogin}
                                   type="text"
                                   className="form-control" id="usr"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="pwd">Password:</label>
                            <input name={'password'} value={this.state.password} onChange={this.handleChangePassword}
                                   type="password" className="form-control" id="pwd"/>
                        </div>
                        <a onClick={this.sendRequest.bind(this)} className={'btn btn-primary'}>Войти</a>
                    </form>
                </div>
            </div>
        )
    }

    sendRequest() {
        console.log('request');
        let data = {};
        axios.post('/api/login', {
            password: this.state.password,
            username: this.state.username
        })
            .then(
                (response) => {
                    data = response.data;
                    if (data.status === 200) {
                        this.props.auth(true, data.username);
                    }
                    /*this.setState({
                        message: response.data.text

                    });*/
                }
            )
            .catch((error) => {
                console.log(error);
            });
    }

}

Login.propTypes = {
    greeting: PropTypes.string
};

/*App.defaultProps = {
    greeting: 'Hi'
};*/

export default Login