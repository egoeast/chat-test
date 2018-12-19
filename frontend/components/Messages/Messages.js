import React from 'react';
import {Component} from 'react';
import './Messages.less';

class Messages extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount() {
    }

    componentDidUpdate() {
        console.log('Messages update');
    }
    render() {
        const {messages} = this.props;

        const messageList = this.props.messages.map((message, index) =>
            <li className="article-list__li" key={message._id} >
                <b>{message.username} : </b>
                    {message.text}
            </li>);
        return(
            <div className={'message-container'}>
                <ul className={'message-list'}>
                    {messageList}
                </ul>
            </div>
        )
    }
}

export default Messages
