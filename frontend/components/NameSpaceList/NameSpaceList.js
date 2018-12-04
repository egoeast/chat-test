import React from 'react';
import {Component} from 'react';
import Emoji from 'react-emoji-render';

class NameSpaceList extends Component {

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
        this.setState({
            currentNameSpace: name
        });
    }

    render () {
        const list = this.state.nameSpaces.map((name) =>
            <div>
                <a onClick={this.handleClick.bind(this, name)}> {name} </a>
            </div>
        );
        return (

            <div>
                <p style={{color: 'red'}}>{this.state.currentNameSpace}</p>
                {list}
            </div>
        )
    }
}

export default NameSpaceList;