// React Redux Imports
import "core-js/stable"
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter as Router, Route } from 'react-router-dom'
import { createStore, compose, applyMiddleware } from 'redux'
import { App } from "./components/App"
import reducers from "./reducers"
import thunkMiddleware from 'redux-thunk'
import * as serviceWorker from './serviceWorker';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create Redux Store
const store = createStore(reducers, composeEnhancer(applyMiddleware(thunkMiddleware)))

ReactDOM.render(
  // Makes store available via any child component that calls connect()
  <Provider store={store}>
    <Router>
      <Route component={App} />
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
