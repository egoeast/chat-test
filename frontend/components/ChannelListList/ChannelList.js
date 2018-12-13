import React from 'react';
import {Component} from 'react';
import Emoji from 'react-emoji-render';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as chatActions from '../../actions/ChatActions';
import PropTypes from 'prop-types';
import * as userActions from "../../actions/UserActions";

class ChannelList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nameSpaces: [
                'One',
                'Two',
                'Three'
            ],
            currentNameSpace: 'One'
        };
    }

    componentDidMount() {
        this.props.chatActions.getChannels();
    }

    handleClick(id) {
        /*this.setState({
            currentNameSpace: name
        });*/
        this.props.chatActions.changeChannel(id);
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
                <p style={{color: 'red'}}>{this.props.currentChannel}</p>
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

function mapStateToProps(state) {
    return {
        currentChannel: state.chat.currentChannel,
        channels: state.chat.channels,
        //changeChannel: state.chat.changeChannel
    }
}

function mapDispatchToProps(dispatch) {
    return {
        chatActions: bindActionCreators(chatActions, dispatch),
        //userActions: bindActionCreators(userActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelList)
