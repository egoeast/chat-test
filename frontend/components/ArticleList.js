import React, {Component} from 'react';
import Article from './Article';
import './style.css';

//import articles from '../fixtures';

class ArticleList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openArticleId: null
        }
    }

    render() {
        ///const articles = this.props.articles
        const ArticleElements = this.props.articles.map((article, index) =>
            <li className="article-list__li" key={article.id} >
                <Article isOpen={this.state.openArticleId === article.id}
                         article={article}
                         onButtonClick = {this.handleClick.bind(this, article.id)}
                />
            </li>);
        return (
            <ul>
                {ArticleElements}
            </ul>)
    }

    handleClick = (openArticleId) => {
        console.log('click')
        console.log(openArticleId)
        this.setState = ({
        openArticleId: openArticleId

    })}
}

export default ArticleList;