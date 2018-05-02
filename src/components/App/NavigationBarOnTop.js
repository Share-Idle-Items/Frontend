import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Grid from "material-ui/Grid";
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import Home from '@material-ui/icons/Home';
import Edit from '@material-ui/icons/Edit';
import CardGiftcard from '@material-ui/icons/CardGiftcard';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Search from '@material-ui/icons/Search';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  bootstrapRoot: {
    padding: 0,
    'label + &': {
      marginTop: 0,
    },
  },
  bootstrapInput: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 12px',
    width: 'calc(100% - 24px)',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
});

@inject('store')
@observer
class NavigationBarOnTop extends Component {
  render() {
    const {classes} = this.props;
    const {location, push, goBack} = this.props.store.routing;

    return (
      <div className={classes.root}>
        <AppBar position="fixed" color={"default"}>
          <Toolbar>
            {/*title*/}
            <Typography variant="title" noWrap color="inherit">
              {this.props.store.AppName}
            </Typography>

            {/*home*/}
            <Button color="inherit" onClick={() => {
              push('/')
            }}><Home />首页</Button>

            {/*publish*/}
            {this.props.store.hasSignedIn && (
              <Button color="inherit" onClick={() => {
                push('/publish')
              }}><Edit />发布闲置</Button>
            )}

            {/*my idle*/}
            {this.props.store.hasSignedIn && (
              <Button color="inherit" onClick={this.switchToMyItemsPage.bind(this)}><CardGiftcard />我的闲置</Button>
            )}

            {/*search bar*/}
            <Grid item>
              <IconButton color="inherit">
                <Search />
              </IconButton>
            </Grid>
            <TextField
              placeholder="搜索"
              InputProps={{
                disableUnderline: true,
                classes: {
                  root: classes.bootstrapRoot,
                  input: classes.bootstrapInput,
                },
              }}
            />
            <div className={classes.flex} />

            {/*things wanted*/}
            {this.props.store.hasSignedIn && (
              <Button color="inherit" onClick={this.switchToWantedPage.bind(this)}><FavoriteBorder />心愿单</Button>
            )}

            {/*user*/}
            <Button color="inherit" onClick={() => {
              push('/user');
            }}><AccountCircle />登陆</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }

  switchToMyItemsPage() {
    this.props.store.pageCode = this.props.store.USERPAGE;
  }

  switchToWantedPage() {
    this.props.store.pageCode = this.props.store.USERPAGE;
  }
}

export default withStyles(styles)(NavigationBarOnTop);
