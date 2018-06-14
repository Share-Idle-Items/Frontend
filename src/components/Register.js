import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AccountBox from '@material-ui/icons/AccountBox';
import Lock from '@material-ui/icons/Lock';
import Spellcheck from '@material-ui/icons/Spellcheck';
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
    marginLeft: window.innerWidth * 0.4 - 225,
    marginRight: theme.spacing.unit,
    width: 450,
  },
  textField: {
    width: 418,
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
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirm: '',
      wrong_code: 0,
    }
  }

  WRONG_USERNAME = 1;
  WRONG_PASSWORD = 2;
  WRONG_CONFIRM = 3;
  WRONG_OCCUPY = 4;

  tryRegister = () => {
    const {store} = this.props;
    const {username, password, confirm} = this.state;
    if (2 <= username.length && username.length <= 7) {
      if (/^[a-zA-Z0-9]{6,14}$/.test(password)) {
        if (confirm === password) {
          if (store.confirmUser(username, password) === store.NO_USER) {
            store.registerUser(username, password);
            store.loginUser();
            store.routing.push('/home');
          } else this.setState({wrong_code: this.WRONG_OCCUPY});
        } else this.setState({wrong_code: this.WRONG_CONFIRM});
      } else this.setState({wrong_code: this.WRONG_PASSWORD});
    } else this.setState({wrong_code: this.WRONG_USERNAME});
  };

  changeUsername = (event) => {
    this.setState({
      username: event.target.value,
      wrong_code: 0,
    });
  };

  changePassword = (event) => {
    this.setState({
      password: event.target.value,
      wrong_code: 0,
    });
  };

  changeConfirm = (event) => {
    this.setState({
      confirm: event.target.value,
      wrong_code: 0,
    });
  };

  handleClose() {
    this.setState({wrong_code: 0});
  }

  render() {
    const {classes, store} = this.props;
    const {location, push, goBack} = this.props.store.routing;

    return (<div className={classes.root}>
      <Typography variant="display1" noWrap className={classes.title}>共享闲置</Typography>
      <div className={classes.textDiv}>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item>
            <AccountBox />
          </Grid>
          <Grid item>
            <TextField id="register_username" label="用户名" className={classes.textField}
                       placeholder='2~7个中/英文字符。永久伴随，认真考虑~'
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
            <TextField id="register_password" type="password" autoComplete="current-password" label="密码"
                       className={classes.textField} placeholder='6~14个字符，只能包含大小写字母和数字。别忘了呀~'
                       onChange={this.changePassword}/>
          </Grid>
        </Grid>
      </div>
      <div className={classes.textDiv}>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item>
            <Spellcheck />
          </Grid>
          <Grid item>
            <TextField id="register_confirm" type="password" autoComplete="current-password" label="再次确认"
                       className={classes.textField} placeholder='再输入一次密码。错了可不能注册哦~'
                       onChange={this.changeConfirm}/>
          </Grid>
        </Grid>
      </div>
      <Button variant="contained" color="primary" className={classes.button} onClick={this.tryRegister}>
        注册
      </Button>
      <Button color="primary" className={classes.extraBtn} onClick={() => push('/login')}>
        已有帐户？<br />直接登录！
      </Button>
      <Dialog
        open={this.state.wrong_code > 0}
        onClose={this.handleClose.bind(this)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">错误！</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {
              this.state.wrong_code === this.WRONG_USERNAME ? '用户名不满足格式要求。':(
                this.state.wrong_code === this.WRONG_PASSWORD ? '密码不满足格式要求。':(
                  this.state.wrong_code === this.WRONG_CONFIRM ? '两次密码输入不同。':(
                    this.state.wrong_code === this.WRONG_OCCUPY ? '用户名被占用。':(
                      '系统错误。请重新尝试。'
                    )
                  )
                )
              )
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose.bind(this)} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>);
  }
}

export default withStyles(styles)(Register);