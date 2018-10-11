import React from 'react';
import {Component} from 'react';

class Messages extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount() {
        console.log(this.props.messages)
    }
    render() {
        const {messages} = this.props;

        const messageList = this.props.messages.map((message, index) =>
            <li className="article-list__li" key={message._id} >
                <b>{message.username} : </b>
                    {message.text}
            </li>);
        return(
            <div>
                <ul className={'message-list'}>
                    {messageList}
                </ul>
            </div>
        )
    }
}

export default Messages;
