import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles } from 'material-ui/styles';
import HeadPortrait from './HeadPortrait';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

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
      display:'none',
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
});

@inject('store')
@observer
class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = { open: true };
  }

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const { classes } = this.props;
    const {location, push, goBack} = this.props.store.routing;

    return (<div className={classes.root}>
      <HeadPortrait />
      <div className={classes.functionList}>
        <List component="nav">
          <ListItem button onClick={this.handleClick}>
            <ListItemText primary="我的宝贝" />
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested} onClick={()=>{push(`/user/items/all`)}}>
                <ListItemText primary="全部" />
              </ListItem>
              <ListItem button className={classes.nested} onClick={()=>{push(`/user/items/rented`)}}>
                <ListItemText primary="已租出的" />
              </ListItem>
              <ListItem button className={classes.nested} onClick={()=>{push(`/user/items/remained`)}}>
                <ListItemText primary="未租出的" />
              </ListItem>
            </List>
          </Collapse>
          <ListItem button onClick={()=>{push(`/user/messages`)}}>
            <ListItemText primary="我的消息" />
          </ListItem>
          <ListItem button onClick={()=>{push(`/user/settings`)}}>
            <ListItemText primary="账号管理" />
          </ListItem>
          <ListItem button onClick={()=>{push(`/user/test`)}}>
            <ListItemText primary="账号管理" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="账号管理" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="账号管理" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="账号管理" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="账号管理" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="账号管理" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="账号管理" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="账号管理" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="账号管理" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="账号管理" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="账号管理" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="账号管理" />
          </ListItem>
        </List>
      </div>
    </div>);
  }
}

export default withStyles(styles)(SideBar);