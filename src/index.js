import {render} from 'react-dom';
import {Provider} from 'mobx-react';
import {BrowserRouter as Router} from 'react-router-dom';
import React from 'react';
import STORE from 'store';
import App from 'components/App/App';

render(
  <Router>
    <Provider store={STORE}>
      <App/>
    </Provider>
  </Router>
  ,document.getElementById('root')
);