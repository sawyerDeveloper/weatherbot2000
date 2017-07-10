import React from 'react';
import ReactDOM from 'react-dom';
import Weather from './containers/Weather.jsx';
import Intro from './containers/Intro.jsx';
import { browserHistory, Router, Route } from 'react-router';

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={Intro}/>
        <Route path="/weather" component={Weather}/>
    </Router>
), document.getElementById('content'));