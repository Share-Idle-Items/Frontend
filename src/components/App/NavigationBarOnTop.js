import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
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
    const {classes, store} = this.props;
    const {location, push, goBack} = store.routing;

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
            {store.user !== undefined && (
              <Button color="inherit" onClick={() => {
                push('/publish')
              }}><Edit />发布闲置</Button>
            )}

            {/*my idle*/}
            {store.user !== undefined && (
              <Button color="inherit" onClick={() => {
                push('/user/items/all');
              }}><CardGiftcard />我的闲置</Button>
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
            {store.user !== undefined && (
              <Button color="inherit" onClick={() => {
                push('/user/items/wanted');
              }}><FavoriteBorder />心愿单</Button>
            )}

            {/*user*/}
            <Button color="inherit" onClick={() => {
              if (store.user === undefined) push('/login');
              else push('/user');
            }}><AccountCircle />{store.user === undefined ? '登录': store.getUserName()}</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(NavigationBarOnTop);
