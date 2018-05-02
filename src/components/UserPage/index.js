import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Route, Switch, Redirect } from 'react-router';
import { withStyles } from 'material-ui/styles';
import SideBar from './SideBar';
import ItemsAll from './ItemsAll';
import ItemsRemained from './ItemsRemained';
import ItemsRented from './ItemsRented';
import Messages from './Messages';
import Settings from './Settings';
import NotFound from './NotFound';

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
          <Route path={`/user/items/all`} component={ItemsAll} />
          <Route path={`/user/items/remained`} component={ItemsRemained} />
          <Route path={`/user/items/rented`} component={ItemsRented} />
          <Route path={`/user/messages`} component={Messages} />
          <Route path={`/user/settings`} component={Settings} />
          <Redirect exact from="/user" to="/user/items/all" />
          <Route path="*" component={NotFound}/>
        </Switch>
      </div>
    </div>);
  }
}

export default withStyles(styles)(UserPage);