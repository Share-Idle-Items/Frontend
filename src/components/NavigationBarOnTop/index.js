import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Home from '@material-ui/icons/Home';
import Edit from '@material-ui/icons/Edit';
import CardGiftcard from '@material-ui/icons/CardGiftcard';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import AccountCircle from '@material-ui/icons/AccountCircle';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

@inject('store')
@observer
class NavigationBarOnTop extends Component {
  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="fixed" color="default">
          <Toolbar>
            <Typography variant="title" color="inherit">
              {this.props.store.AppName}
            </Typography>
            <Button color="inherit"><Home />首页</Button>
            {this.props.store.hasSignedIn && (
              <Button color="inherit"><Edit />发布闲置</Button>
            )}
            {this.props.store.hasSignedIn && (
              <Button color="inherit"><CardGiftcard />我的闲置</Button>
            )}
            <Typography variant="title" color="inherit" className={classes.flex}/>
            {this.props.store.hasSignedIn && (
              <Button color="inherit"><FavoriteBorder />心愿单</Button>
            )}
            <Button color="inherit" onClick={this.signIn.bind(this)}><AccountCircle />登陆</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }

  signIn() {
    this.props.store.hasSignedIn = !this.props.store.hasSignedIn;
  }
}

export default withStyles(styles)(NavigationBarOnTop);
