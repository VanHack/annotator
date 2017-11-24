
import 'material-design-icons-iconfont-only/iconfont/material-icons.css';
import 'typeface-roboto'; // eslint-disable-line
import 'jquery';
import 'materialize-css';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';

import PDFLib from 'pdfjs-dist';

import Application from '@/containers/Application';
import rootReducer from '@/data';

import { login } from '@/data/User/actions';
import '@/assets/styles/style.scss';

PDFLib.PDFJS.workerSrc = 'pdfjs-worker-bundle.js';

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, loggerMiddleware));

// Check access token and then login or logout
// Mocking always login, but this verification
// could be done in the login action too.
store.dispatch(login());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route component={Application} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app'),
);
