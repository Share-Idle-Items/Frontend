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
  constructor(props) {
    super(props);
    this.state = {
      user: {
        id: '',
        name: '',
        portrait: null,
        phone: '',
        city: [],
        credit: 0,
        id_card: '',
        real_name: '',
      },
      myItems: [],
      myUsages: [],
    }
  }
  componentWillMount(){
    const { store } = this.props;
    store.getUserInfo(store.user, data=>{
      this.setState(data)
    })
  }
  render() {
    const { classes, store } = this.props;
    const {location, push, goBack} = store.routing;
    if(store.user === undefined) {
      push('/login');
      return (<div/>);
    }
    return (<div className={classes.root}>
      <SideBar org_data={this.state.user}/>
        <div className={classes.content}>
          <Switch>
            <Route path={`/user/my_items`} render={(props)=><Items org_data={this.state.myItems}/>} />
            <Route path={`/user/my_usages`} render={(props)=><Items org_data={this.state.myUsages}/>} />
            <Route path={`/user/messages`} component={(props)=><Messages />} />
            <Route path={`/user/settings`} component={(props)=><Settings org_data={this.state.user}/>} />
            <Redirect from="/user" to="/user/my_items" />
          </Switch>
        </div>
      </div>);
  }
}

export default withStyles(styles)(UserPage);