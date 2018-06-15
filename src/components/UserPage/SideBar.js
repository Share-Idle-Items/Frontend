import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import HeadPortrait from './HeadPortrait';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
  root: {
    position: 'relative',
    width: '200px',
    height: '100%',
  },
  functionList: {
    position: 'absolute',
    top: '320px',
    width: '200px',
    overflowY: 'auto',
    overflowX: 'hidden',
    maxHeight: window.innerHeight - 320,
    '&::-webkit-scrollbar': {
      width: '10px',
      height: '10px',
    },
    '&::-webkit-scrollbar-button': {
      display: 'none',
    },
    '&::-webkit-scrollbar-track': {
      WebkitBoxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
      borderRadius: '8px',
      backgroundColor: 'white',
      margin: '5px',
    },
    '&::-webkit-scrollbar-track-piece': {
      width: '10px',
      height: '10px'
    },
    '&::-webkit-scrollbar-thumb': {
      WebkitBoxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
      borderRadius: '8px',
      width: '10px',
      height: '10px',
      backgroundColor: 'grey',
    },
    '&::-webkit-scrollbar-corner': {
      display: 'none'
    },
    '&::-webkit-resizer': {
      display: 'none'
    },
  },
  nested: {
    paddingLeft: theme.spacing.unit * 7,
  },
  chosen: {
    backgroundColor: '#40aaef',
  },
  normal: {},
});

@inject('store')
@observer
class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      choice: 0,
    }
  }

  render() {
    const {classes} = this.props;
    const {location, push, goBack} = this.props.store.routing;
    const data = this.props.org_data;

    return (<div className={classes.root}>
      <HeadPortrait org_data={data} />
      <div className={classes.functionList}>
        <List component="nav">
          <ListItem button classes={{root: this.state.choice === 0 ? classes.chosen: classes.normal}} onClick={() => {
            push(`/user/my_items`);
            this.setState({choice: 0});
          }}>
            <ListItemText primary="我的共享" />
          </ListItem>
          <ListItem button classes={{root: this.state.choice === 1 ? classes.chosen: classes.normal}} onClick={() => {
            push(`/user/my_usages`);
            this.setState({choice: 1});
          }}>
            <ListItemText primary="我的使用" />
          </ListItem>
          <ListItem button classes={{root: this.state.choice === 2 ? classes.chosen: classes.normal}} onClick={() => {
            push(`/user/messages`);
            this.setState({choice: 2});
          }}>
            <ListItemText primary="我的消息" />
          </ListItem>
          <ListItem button classes={{root: this.state.choice === 3 ? classes.chosen: classes.normal}} onClick={() => {
            push(`/user/settings`);
            this.setState({choice: 3});
          }}>
            <ListItemText primary="账号管理" />
          </ListItem>
        </List>
      </div>
    </div>);
  }
}

export default withStyles(styles)(SideBar);