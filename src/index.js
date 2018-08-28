import React from 'react';
import ReactDOM from 'react-dom';
import QuotesContainer from './components/QuotesContainer';
import '../node_modules/normalize.css/normalize.css';
import 'animate.css/animate.min.css';
import './styles/css/app.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<QuotesContainer />, document.getElementById('root'));
registerServiceWorker();
