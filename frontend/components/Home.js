import React from 'react';
import {Component} from 'react';

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <div className="container">
                <div className="jumbotron">
                    <h1 className="display-3">Welcome</h1>
                </div>
            </div>
        )
    }
}

export default Home