// Render the top-level React component
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import {
    createStore,
    applyMiddleware
} from 'redux';

import { Router } from 'react-router';
import reduxThunk from 'redux-thunk';
import rootReducer from './reducers';
import App from './App';
import createBrowserHistory from 'history/createBrowserHistory'

const customHistory = createBrowserHistory()
const store = createStore(
    rootReducer,
    applyMiddleware(reduxThunk)
);

render(
    <Provider store={store}>
        <Router history={customHistory}>
            <App />
        </Router>
    </Provider>,
    document.getElementById('app')
)