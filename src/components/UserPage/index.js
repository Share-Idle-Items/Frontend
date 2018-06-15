import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Route, Switch, Redirect } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import SideBar from './SideBar';
import Items from './Items';
import Messages from './Messages';
import Settings from './Settings';

const styles = theme => ({
  root: {
    minHeight: innerHeight - 190,
    display: 'flex',
    width: window.innerWidth * 0.8,
    marginLeft: window.innerWidth * 0.1,
  },
  content: {
    flex: 1,
    borderLeft: '1px #40aaef solid',
    borderRight: '1px #40aaef solid',
    paddingTop: '80px',
    paddingBottom: '40px',
  }
});

@inject('store')
@observer
class UserPage extends Component {
  render() {
    const { classes, store } = this.props;
    const {location, push, goBack} = store.routing;
    const data = store.getUserInfo();
    if(data === undefined) {
      push('/login');
      return (<div/>);
    }
    return (<div className={classes.root}>
      <SideBar org_data={data.user}/>
      <div className={classes.content}>
        <Switch>
          <Route path={`/user/my_items`} render={(props)=><Items org_data={data.myItems}/>} />
          <Route path={`/user/my_usages`} render={(props)=><Items org_data={data.myUsages}/>} />
          <Route path={`/user/messages`} component={(props)=><Messages />} />
          <Route path={`/user/settings`} component={(props)=><Settings org_data={data.user}/>} />
          <Redirect from="/user" to="/user/my_items" />
        </Switch>
      </div>
    </div>);
  }
}

export default withStyles(styles)(UserPage);