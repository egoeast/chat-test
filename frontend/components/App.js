import React from 'react';
import {Component} from 'react';
import PropTypes from 'prop-types';
//import articles from '../fixtures';
//import ArticleList from './ArticleList';
import axios from 'axios';


class App extends Component {



    constructor(props) {
        super(props);

        this.state = {
            // isOpen: this.props.defaultOpen,
            clickCount: 0,
            message: "Hi",
            login: 'name',
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
        console.log(data);
    }

    handleChangeLogin(event) {
        console.log(event.target);
        this.setState({ login: event.target.value});
    }

    handleChangePassword(event) {
        console.log(event.target);
        this.setState({ password: event.target.value});
    }

    render() {
        console.log(this.props);
        return (

            <div className="container">
                <div className="jumbotron">
                    <h1 className="display-3">App name</h1>
                    <div>{this.state.message}</div>
                    <form>
                        <div className="form-group">
                            <label htmlFor="usr">Name:</label>
                            <input name={'login'} value={this.state.login} onChange={this.handleChangeLogin} type="text" className="form-control" id="usr"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="pwd">Password:</label>
                            <input name={'password'} value={this.state.password} onChange={this.handleChangePassword} type="password" className="form-control" id="pwd"/>
                        </div>
                        <a onClick={this.sendRequest.bind(this)} className={'btn btn-primary'}>Войти</a>
                    </form>
                </div>
            </div>
        )
    }

    sendRequest() {
        console.log('request')
        axios.post('/test/api', {
            password: this.state.password,
            login: this.state.login
        })
            .then(
                response => this.setState({
                    message: response.data.text
                })
            )
            .catch(function (error) {
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

export default App