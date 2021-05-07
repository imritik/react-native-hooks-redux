import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from './app/store';
import Router from './app/components/index';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}
