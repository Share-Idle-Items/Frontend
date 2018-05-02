import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Route, Switch, Redirect } from 'react-router';
import { withStyles } from 'material-ui/styles';
import SideBar from './SideBar';
import Items from './Items';
import Messages from './Messages';
import Settings from './Settings';

const styles = theme => ({
  root: {
    display: 'flex',
    width: window.innerWidth * 0.8,
    height: window.innerHeight,
    marginLeft: window.innerWidth * 0.1,
  },
  content: {
    flex: 1,
    borderLeft: '1px black solid',
    borderRight: '1px black solid',
    paddingTop: '80px',
    paddingBottom: '40px',
  }
});

@inject('store')
@observer
class UserPage extends Component {
  render() {
    const { classes } = this.props;
    const {location, push, goBack} = this.props.store.routing;

    return (<div className={classes.root}>
      <SideBar />
      <div className={classes.content}>
        <Switch>
          <Route path={`/user/items/all`} render={(props)=><Items typeFilter="all"/>} />
          <Route path={`/user/items/history`} render={(props)=><Items typeFilter="history"/>} />
          <Route path={`/user/items/remained`} render={(props)=><Items typeFilter="remained"/>} />
          <Route path={`/user/items/lent`} render={(props)=><Items typeFilter="lent"/>} />
          <Route path={`/user/items/borrowed`} render={(props)=><Items typeFilter="borrowed"/>} />
          <Route path={`/user/items/wanted`} render={(props)=><Items typeFilter="wanted"/>} />
          <Route path={`/user/messages`} component={Messages} />
          <Route path={`/user/settings`} component={Settings} />
          <Redirect from="/user" to="/user/items/all" />
        </Switch>
      </div>
    </div>);
  }
}

export default withStyles(styles)(UserPage);