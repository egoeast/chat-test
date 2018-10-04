import React from 'react';
import {Component} from 'react';
import {Route, Link, Redirect} from "react-router-dom";

class PrivateRoute extends Component {

    render() {
        const Page = this.props.component;
        return (
            <Route exact path={this.props.path} render={() => (
                this.props.auth ? (
                    <Page/>
                ) : (
                    <Redirect to={this.props.redirectTo}/>
                )
            )}/>
        )
    }

}

export default PrivateRoute