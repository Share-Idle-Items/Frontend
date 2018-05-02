import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Route, Switch, Redirect } from 'react-router';
import { withStyles } from 'material-ui/styles';
import NavigationBarOnTop from './NavigationBarOnTop';
import CopyRight from './CopyRight';
import HomePage from '../HomePage';
import PublishPage from '../PublishPage';
import UserPage from '../UserPage';

const styles = theme => ({});

@inject('store')
@observer
class App extends Component {
  render() {
    const {classes} = this.props;

    return (
      <main>
        <NavigationBarOnTop />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route path="/publish" component={PublishPage} />
          <Route path="/user" component={UserPage} />
          <Redirect from="/" to="/home"/>
        </Switch>
        <CopyRight />
      </main>
    );
  }
}

export default withStyles(styles)(App);