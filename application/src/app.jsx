
import 'material-design-icons-iconfont-only/iconfont/material-icons.css';
import 'typeface-roboto'; // eslint-disable-line
import 'jquery';
import 'materialize-css';

import S from 'string';
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

import { userLoggedIn, userLoggedOut } from '@/data/User/actions';
import '@/assets/styles/style.scss';

PDFLib.PDFJS.workerSrc = 'pdfjs-worker-bundle.js';

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, loggerMiddleware));

const token = S(localStorage.feedbackToken);
if (!token.isEmpty()) {
  store.dispatch(userLoggedIn(token.s));
} else {
  store.dispatch(userLoggedOut());
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route component={Application} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app'),
);
