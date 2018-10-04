import React from 'react';
import {Component} from 'react';

class Chat extends Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    componentDidMount() {

        console.log(document.cookie);
    }

    render() {
        return (
            <div className="container">
                <div className="jumbotron">
                    <h1 className="display-3">Chat</h1>
                    <textarea placeholder={'Type message...'} />
                    <a className={'btn btn-primary'}>Send</a>
                </div>
            </div>
        )
    }
}

export default Chat