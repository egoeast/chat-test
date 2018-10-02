import React, {Component, PureComponent} from 'react'

class Article extends Component {

    constructor(props) {
        super(props)

        this.state = {
            // isOpen: this.props.defaultOpen,
            clickCount: 0
        }
    }

    componentWillMount() {
        console.log('---mounted')
    }
/*

    componentWillReceiveProps(nextProps) {
        console.log('---will receive props')
        if (nextProps.defaultOpen !== this.props.defaultOpen) this.setState({
            isOpen: nextProps.defaultOpen
        })
    }
*/
/*
    shouldComponentUpdate(nextProps, nextState) {
        return this.state.isOpen !== nextState.isOpen
    }
*/
    componentWillUpdate() {
        console.log('---will update')
    }

    render() {
        const
            {article, isOpen, onButtonClick} = this.props
        const
            body = isOpen && <section className="card-text">{article.text}</section>
        return (

            <div className="card">
                <div className="card-header">
                    <h2>
                        {article.title}
                        clicked: {this.state.clickCount}
                        <button className="btn btn-primary btn-lg"
                                onClick={onButtonClick}>{isOpen ? 'Close' : 'Open'}</button>
                    </h2>
                </div>
                <div className="card-body">
                    <h6 className="card-subtitle text">Creation date: {(new Date(article.date)).toDateString()}</h6>
                    {body}
                </div>
            </div>
        )
    }

    handleClick = () => {
        /*this.setState({
            isOpen: !this.state.isOpen
        })*/
    }

    incCount = () => {
        console.log('click')
        this.setState({
            clickCount: this.state.clickCount + 1
        })
    }
}

export default Article