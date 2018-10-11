import React from 'react';
import {Component} from 'react';
import Messages from "./Messages";

let socket;

class Chat extends Component {

    constructor(props) {
        super(props);

        this.state = {
            message: '',
            messages: [

                ]
        };
    }

    componentDidMount() {
        socket = io();
        socket.on('connect', () => {
            socket.emit('storeUserData', {username: this.props.username});
        });

        socket.on('chat message', (msg) => {
            this.reseiveMessage(msg)
        });

    }

    handleChangeMessage(event) {
        this.setState({
            message: event.target.value
        });
    }

    render() {
        return (
            <div className="container">
                <div className="jumbotron">
                    <h1 className="display-3">Chat</h1>
                    <Messages
                        messages = {this.state.messages}
                    />
                    <input placeholder={'Type message...'} onChange={this.handleChangeMessage.bind(this)} />
                    <a className={'btn btn-primary'} onClick={this.sendMessage.bind(this)}>Send</a>
                </div>
            </div>
        )
    }

    sendMessage() {
        socket.emit('chat message', {id:3, username: this.props.username, text: this.state.message});
    }

    reseiveMessage(message) {
        const arrayMsg = this.state.messages;
        arrayMsg.push(message);
        console.log(message);
        this.setState({
           messages: arrayMsg
        });
    }

    componentWillUnmount() {
        socket.disconnect();
    }
}

export default Chat