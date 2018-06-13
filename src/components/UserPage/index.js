import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Route, Switch, Redirect } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import SideBar from './SideBar';
import {Items} from './Items';
import {Messages} from './Messages';
import {Settings} from './Settings';

const styles = theme => ({
  root: {
    height: innerHeight - 190,
    display: 'flex',
    width: window.innerWidth * 0.8,
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
    const { classes, store } = this.props;
    const {location, push, goBack} = store.routing;
    const data = store.getUserInfo();
    if(data === undefined) {
      push('/home');
      return (<div/>);
    }
    console.log(SideBar);
    return (<div className={classes.root}>
      <SideBar org_data={data.user}/>
      <div className={classes.content}>
        <Switch>
          <Route path={`/user/items/history`} render={(props)=><Items org_data={data.myItems} typeFilter="history"/>} />
          <Route path={`/user/items/remained`} render={(props)=><Items org_data={data.myItems} typeFilter="remained"/>} />
          <Route path={`/user/items/lent`} render={(props)=><Items org_data={data.myItems} typeFilter="lent"/>} />
          <Route path={`/user/items/borrowed`} render={(props)=><Items org_data={data.myItems} typeFilter="borrowed"/>} />
          <Route path={`/user/items/wanted`} render={(props)=><Items org_data={data.myItems} typeFilter="wanted"/>} />
          <Route path={`/user/messages`} component={Messages} />
          <Route path={`/user/settings`} component={Settings} />
          <Redirect from="/user" to="/user/items/lent" />
        </Switch>
      </div>
    </div>);
  }
}

export default withStyles(styles)(UserPage);