import {render} from 'react-dom';
import {Provider} from 'mobx-react';
import createBrowserHistory from 'history/createBrowserHistory';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { Router, Route, IndexRedirect } from 'react-router';
import React from 'react';
import STORE from 'store';
import App from 'components/App/App';

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();
STORE.routing = routingStore;
const history = syncHistoryWithStore(browserHistory, routingStore);

render(
  <Provider store={STORE}>
    <Router history={history}>
      <Route path='/' component={App}>
      </Route>
    </Router>
  </Provider>
  ,document.getElementById('root')
);