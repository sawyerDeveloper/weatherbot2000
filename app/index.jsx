import React from 'react';
import ReactDom from 'react-dom';
import { browserHistory, Router, Route } from 'react-router';


ReactDOM.render((

    <Router history={browserHistory}>
        <Route path="/" component={weather}>
            <Route path="/details" component={details}/>
        </Route>
    </Router>
), document.getElementById('content'));