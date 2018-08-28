import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

class QuotesContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            quote: null,
            animate: false,
            loading: true
        };

        this.fetchQuotes = this.fetchQuotes.bind(this);
        this.renderQuote = this.renderQuote.bind(this);
        this.changeBackground = this.changeBackground.bind(this);
        this.prepareTweet = this.prepareTweet.bind(this);

        this.changeBackground();
    }

    componentDidMount() {
        this.fetchQuotes();
    }

    changeBackground() {
        const bgColour = `bg-${Math.floor(Math.random() * 10) + 1}`;
        document.body.classList.add(bgColour);
    }

    fetchQuotes() {
        const API_END_POINT = 'https://favqs.com/api/qotd';
        this.setState({ animate: false });

        axios
            .get(API_END_POINT)
            .then(result => {
                const {
                    quote: { body: text, author }
                } = result.data;

                this.setState({
                    quote: { text, author },
                    animate: true
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    renderQuote() {
        const quote = this.state.quote;

        if (quote) {
            const { text, author } = quote;
            return (
                <div>
                    <div id="text">{text}</div>
                    <div id="author">- {author}</div>
                </div>
            );
        }
    }

    prepareTweet() {
        const quote = this.state.quote;

        if (quote) {
            const url = new URL('https://twitter.com/intent/tweet');
            url.searchParams.set('text', `${quote.text}-${quote.author}`);
            return url;
        } else {
            return '#';
        }
    }

    render() {
        return (
            <div id="quote-box">
                <div className="tweet-container">
                    <a
                        href={this.prepareTweet()}
                        id="tweet-quote"
                        target="_blank"
                    >
                        <FontAwesomeIcon icon={faTwitter} size="sm" />
                    </a>
                </div>
                <div className="wrapper">
                    <CSSTransition
                        in={this.state.animate}
                        timeout={1200}
                        classNames={{
                            enter: 'animated',
                            enterActive: 'jackInTheBox',
                            exit: 'animated',
                            exitActive: 'fadeOut'
                        }}
                        mountOnEnter
                        unmountOnExit
                    >
                        {this.renderQuote()}
                    </CSSTransition>
                    {!this.state.quote && <div className="loader" />}
                </div>
                <div className="button-container">
                    <button id="new-quote" onClick={this.fetchQuotes}>
                        <FontAwesomeIcon icon={faArrowRight} size="lg" />
                    </button>
                </div>
            </div>
        );
    }
}

export default QuotesContainer;
