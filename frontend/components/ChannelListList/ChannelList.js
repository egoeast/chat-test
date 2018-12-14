import React from 'react';
import {Component} from 'react';
import Emoji from 'react-emoji-render';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as chatActions from '../../actions/ChatActions';
import PropTypes from 'prop-types';
import * as userActions from "../../actions/UserActions";

export default class ChannelList extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        //this.props.chatActions.getChannels();
    }

    handleClick(id) {
        //this.props.chatActions.changeChannel(id);
        //this.props.chatActions.getChannelMessages(id);
    }

    render () {
        const {channels} = this.props;
        const list = channels.map((channel, index) =>
            <div key={channel._id}>
                <a onClick={this.handleClick.bind(this, channel._id)} > {channel.name} </a>
            </div>
        );
        return (

            <div>
                <b><p>Channels</p></b>
                {list}
            </div>
        )
    }
}

/*ChannelList.propTypes = {
    currentChannel: PropTypes.string.isRequired,
    changeChannel: PropTypes.func.isRequired,
    channels: PropTypes.array
};*/

/*
function mapStateToProps(state) {
    return {
        currentChannel: state.chat.currentChannel,
        channels: state.chat.channels,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        chatActions: bindActionCreators(chatActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelList)
*/
