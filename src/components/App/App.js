import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import { withStyles } from 'material-ui/styles';
import NavigationBarOnTop from '../NavigationBarOnTop';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import HomePage from '../HomePage';
import PublishPage from '../PublishPage';
import UserPage from '../UserPage';

const styles = theme => ({
  paddingTop: {
    paddingTop: '80px',
  },
});

@inject('store')
@observer
class App extends Component {
  render() {
    const {classes} = this.props;
    return (
      <main>
        <NavigationBarOnTop/>
        <div className={classes.paddingTop}>
        {
          ((this.props.store.pageCode === this.props.store.HOMEPAGE) && (<HomePage/>)) ||
          ((this.props.store.pageCode === this.props.store.PUBLISHPAGE) && (<PublishPage/>)) ||
          ((this.props.store.pageCode === this.props.store.USERPAGE) && (<UserPage/>))
        }
        </div>
      </main>
    );
  }
}

export default withStyles(styles)(App);