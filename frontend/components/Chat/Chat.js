import React from 'react';
import {Component} from 'react';
import Messages from "../Messages/Messages";
import style from './Chat.less';
import Emoji from 'react-emoji-render';
import NameSpaceList from '../NameSpaceList/NameSpaceList'

let socket;
let emojiArray = [':grinning:', ':grin:', ':joy:', ':smiley:', ':smile:'];

class Chat extends Component {

    constructor(props) {
        super(props);

        this.state = {
            message: '',
            messages: []
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

    handleKeyPress(event) {
        if (event.key == 'Enter') {
            this.sendMessage();
        }
    }

    addEmoji(em) {
        //console.log(em);
        /*let mess = this.state.message + em;
        this.setState({
            message: this.message + mess
        })*/
        //this.sendMessage(em)
    }

    render() {
       /* const emojiModal = emojiArray.map((em, index) =>
            <a href={''} onClick={this.addEmoji(em)}>
                {em}
            </a>
        );*/
        const  emojiModal = '';

        return (
            <div className="container">
                <div className={'row'}>
                <div className={'col-md-2 jumbotron'}>
                    <NameSpaceList currentChannel={this.props.currentChannel} changeChannel={this.props.changeChannel}/>
                </div>
                <div className={'col-md-10'}>
                    <div className="jumbotron">
                        <h1 className="display-3">Chat</h1>
                        <Messages
                            messages={this.state.messages}
                        />
                        {emojiModal}

                        <div className="input-group">
                            <input placeholder={'Type message...'} onChange={this.handleChangeMessage.bind(this)}
                                   className="form-control" onKeyPress={this.handleKeyPress.bind(this)}
                                   value={this.state.message}/>
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary" type="button"
                                        onClick={this.sendMessage.bind(this)}>Send
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }

    sendMessage() {
        if (this.state.message) {
            socket.emit('chat message', {id: 3, username: this.props.username, text: this.state.message});
            this.setState({
                message: ''
            })
        }
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