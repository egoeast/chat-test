import React from 'react';
import {PropTypes, Component} from 'react';
import Emoji from 'react-emoji-render';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as chatActions from '../../actions/ChatActions';

export default class NameSpaceList extends Component {

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

    handleClick(name) {
        /*this.setState({
            currentNameSpace: name
        });*/
        this.props.changeChannel(name);
    }

    render () {
        const list = this.state.nameSpaces.map((name, index) =>
            <div key={index}>
                <a onClick={this.handleClick.bind(this, name)} > {name} </a>
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

NameSpaceList.propTypes ={
    //currentChannel: PropTypes.string,
    //changeChannel: PropTypes.func.isRequired
};

//export default NameSpaceList;