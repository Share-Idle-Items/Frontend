import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Route, Switch, Redirect } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import NavigationBarOnTop from './NavigationBarOnTop';
import CopyRight from './CopyRight';
import HomePage from '../HomePage';
import PublishPage from '../PublishPage';
import UserPage from '../UserPage';
import ItemPage from '../ItemPage';
import LogIn from '../UserPage/LogIn';
import Register from '../UserPage/Register';

const styles = theme => ({});

@inject('store')
@observer
class App extends Component {
  render() {
    const {classes, store} = this.props;

    return (
      <main>
        <NavigationBarOnTop />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route path="/publish" component={PublishPage} />
          <Route path="/user" component={UserPage} />
          <Route path="/item" component={ItemPage} />
          <Route path="/login" component={LogIn} />
          <Route path="/register" component={Register} />
          <Redirect from="/" to="/home"/>
        </Switch>
        <CopyRight />
      </main>
    );
  }
}

export default withStyles(styles)(App);