import React from 'react';
import ReactDOM from 'react-dom';
import Weather from './containers/Weather.jsx';
import Details from './containers/Details.jsx';
import App from './containers/App.jsx';
import { browserHistory, Router, Route } from 'react-router';


ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route path="/weather" component={Weather}>
                <Route path="/details" component={Details}/>
            </Route>
        </Route>
    </Router>
), document.getElementById('content'));