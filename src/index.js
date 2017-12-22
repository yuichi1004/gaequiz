import React from 'react';
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'

import registerServiceWorker from './registerServiceWorker';

import App from './containers/app';
import { initialize } from './actions/index';
import reducer from './reducers/index'
import './index.css';

const loggerMiddleware = createLogger()

const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
)

store.dispatch(initialize())

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
