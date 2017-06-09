import React from 'react';
import ReactDOM from 'react-dom';
import Weather from './Weather.jsx';
import Details from './components/Details.jsx';
import { browserHistory, Router, Route } from 'react-router';


ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={Weather}>
            <Route path="/details" component={Details}/>
        </Route>
    </Router>
), document.getElementById('content'));