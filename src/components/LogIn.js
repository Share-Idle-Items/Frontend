import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AccountBox from '@material-ui/icons/AccountBox';
import Lock from '@material-ui/icons/Lock';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme => ({
  root: {
    width: window.innerWidth * 0.8,
    height: window.innerHeight * 0.5 + 145,
    marginLeft: window.innerWidth * 0.1,
    marginTop: '80px',
    paddingTop: window.innerHeight * 0.5 - 250,
  },
  title: {
    marginBottom: theme.spacing.unit * 5,
    textAlign: 'center',
  },
  textDiv: {
    marginLeft: window.innerWidth * 0.25,
    marginRight: theme.spacing.unit,
    width: window.innerWidth * 0.3,
  },
  textField: {
    width: window.innerWidth * 0.3 - 32,
  },
  button: {
    marginTop: theme.spacing.unit * 5,
    marginLeft: window.innerWidth * 0.3,
    width: window.innerWidth * 0.2,
  },
  extraBtn: {
    marginTop: theme.spacing.unit * 5,
    marginLeft: window.innerWidth * 0.5,
    width: window.innerWidth * 0.1,
  },
});

@inject('store')
@observer
class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      wrong: false,
    }
  }

  tryLog = () => {
    const {store} = this.props;
    store.confirmUser(this.state.username, this.state.password, result=>{
      switch (result) {
        case store.PASS:
          store.loginUser(this.state.username, this.state.password);
          store.routing.push('/home');
          break;
        case store.NO_USER:
          this.setState({wrong: true});
          break;
        case store.WRONG_PASSWORD:
          this.setState({wrong: true});
          break;
      }
    });
  };

  changeUsername = (event) => {
    this.setState({
      username: event.target.value,
      wrong: false,
    });
  };

  changePassword = (event) => {
    this.setState({
      password: event.target.value,
      wrong: false,
    });
  };

  handleClose = () => {
    this.setState({wrong: false});
  };

  render() {
    const {classes, store} = this.props;
    const {location, push, goBack} = store.routing;

    return (
      <div className={classes.root}>
        <Typography variant="display1" noWrap className={classes.title}>共享闲置</Typography>
        <div className={classes.textDiv}>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              <AccountBox />
            </Grid>
            <Grid item>
              <TextField id="login_username" label="用户名" className={classes.textField}
                         onChange={this.changeUsername} />
            </Grid>
          </Grid>
        </div>
        <div className={classes.textDiv}>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              <Lock />
            </Grid>
            <Grid item>
              <TextField id="login_password" type="password" autoComplete="current-password" label="密码"
                         className={classes.textField} onChange={this.changePassword} />
            </Grid>
          </Grid>
        </div>
        <Button variant="contained" color="primary" className={classes.button} onClick={this.tryLog}>
          登录
        </Button>
        <Button color="primary" className={classes.extraBtn} onClick={() => push('/register')}>
          没有帐户？<br />注册一个！
        </Button>
        <Dialog
          open={this.state.wrong}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">错误！</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              用户名或密码错误。
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>);
  }
}

export default withStyles(styles)(LogIn);