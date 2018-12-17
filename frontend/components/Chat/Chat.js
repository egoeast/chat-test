import React from 'react';
import {Component} from 'react';
import Messages from "../Messages/Messages";
import style from './Chat.less';
import Emoji from 'react-emoji-render';
import ChannelList from '../ChannelListList/ChannelList';
import * as chatActions from "../../actions/ChatActions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

let socket;
let emojiArray = [':grinning:', ':grin:', ':joy:', ':smiley:', ':smile:'];

class Chat extends Component {

    constructor(props) {
        super(props);

        this.state = {
            message: '',
        };
    }

    componentDidMount() {

        this.props.chatActions.getChannels();
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

    componentDidUpdate() {
        console.log('Chat update');
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
      /*  const messages = [];
        this.props.messages.forEach((message) => {
            if (message.channelId === this.props.currentChannel) {}
            messages.push(message);
        });
        console.log(messages);*/
      const currentChannel = this.props.channels.find(channel => channel._id === this.props.currentChannel);

      let messages = this.props.messages;
      if (currentChannel) {
          messages = currentChannel.messages;
      }
        console.log('messages:');
        console.log( messages);
        return (
            <div className="container">
                <div className={'row'}>
                <div className={'col-md-2 jumbotron'}>
                    <ChannelList channels={this.props.channels} changeChannel={this.props.chatActions.changeChannel} getChannelMessages={this.props.chatActions.getChannelMessages}/>
                </div>
                <div className={'col-md-10'}>
                    <div className="jumbotron">
                        <h3 className="display-6">{ currentChannel ? currentChannel.name : ''  }</h3>
                        <Messages
                            messages={messages}
                            fetching={this.props.fetching}
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
            socket.emit('chat message', {channelId: this.props.currentChannel, username: this.props.username, text: this.state.message});
            this.setState({
                message: ''
            })
        }
    }

    reseiveMessage(message) {
        this.props.chatActions.reseiveMessage(message);
        this.forceUpdate();
    }

    componentWillUnmount() {
        socket.disconnect();
    }
}

function mapStateToProps(state) {
    return {
        currentChannel: state.chat.currentChannel,
        channels: state.chat.channels,
        messages: state.chat.messages,
        fetching: state.chat.fetching,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        chatActions: bindActionCreators(chatActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)