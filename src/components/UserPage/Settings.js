import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
  root: {
    width: '80%',
    marginLeft: '10%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  details: {
    display: 'block',
  },
  detail: {
    margin: '10px',
  },
  cityPicker: {
    display: 'flex',
    height: '32px',
    lineHeight: '32px',
    marginTop: '10px',
  },
  formControl: {
    margin: '0 5px',
    width: innerWidth * 0.1 - 17,
  },
  selectEmpty: {
    marginTop: 0,
  },
});

@inject('store')
@observer
class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changePassword: false,
      changePhone: false,
      changeCity: false,
      changeReal: false,
      check: '',
      password: '',
      phone: '',
      location: {
        province: '',
        city: '',
        district: '',
      },
      real_name: '',
      id_card: '',
    }
  }

  logout = () => {
    this.props.store.logout();
    this.props.store.routing.push('/home');
  };

  changeProvince = event => {
    this.setState({
      location: {
        province: event.target.value,
        city: '',
        district: '',
      },
    });
  };

  changeCity = event => {
    this.setState({
      location: {
        province: this.state.location.province,
        city: event.target.value,
        district: '',
      },
    });
  };

  changeDistrict = event => {
    this.setState({
      location: {
        province: this.state.location.province,
        city: this.state.location.city,
        district: event.target.value,
      },
    });
  };

  changeCheck = event => {
    this.setState({
      check: event.target.value,
    })
  };

  changePassword = event => {
    this.setState({
      password: event.target.value,
    })
  };

  changePhone = event => {
    this.setState({
      phone: event.target.value,
    })
  };

  changeRealName = event => {
    this.setState({
      real_name: event.target.value,
    })
  };

  changeIdCard = event => {
    this.setState({
      id_card: event.target.value,
    })
  };

  tryChangePassword = () => {
    this.setState({
      changePassword: true,
    });
  };

  tryChangePhone = () => {
    this.setState({
      changePhone: true,
    });
  };

  tryChangeCity = () => {
    this.setState({
      changeCity: true,
    });
  };

  tryChangeReal = () => {
    this.setState({
      changeReal: true,
    })
  };

  handleClose = () => {
    this.setState({
      changePassword: false,
      changePhone: false,
      changeCity: false,
      changeReal: false,
      check: '',
      password: '',
      phone: '',
      location: {
        province: '',
        city: '',
        district: '',
      },
      real_name: '',
      id_card: '',
    });
  };

  handleUpdate = () => {
    const store = this.props.store;
    let changeSomething = true;
    let close = true;
    store.confirmUser(this.props.org_data.name, this.state.check, result=>{
      if (result !== store.PASS) {
        close = false;
        alert("密码认证失败");
      } else {
        changeSomething = false;
        if(this.state.password.length !== 0) {
          changeSomething = true;
          if (/^[a-zA-Z0-9]{6,14}$/.test(this.state.password)) {
            store.updateUserInfo({
              password: this.state.password
            })
          } else {
            close = false;
            alert('新密码不符合标准');
          }
        }
        if(this.state.phone.length !== 0) {
          changeSomething = true;
          if (/^[1][0-9]{10}$/.test(this.state.phone)) {
            store.updateUserInfo({
              phone: this.state.phone
            })
          } else {
            close = false;
            alert('新手机不符合格式要求');
          }
        }
        if(this.state.location.province.length !== 0) {
          changeSomething = true;
          store.updateUserInfo({
            city: this.state.location
          })
        }
        if(this.state.real_name.length !== 0 && this.state.id_card.length !== 0) {
          changeSomething = true;
          store.updateUserInfo({
            real_name: this.state.real_name,
            id_card: this.state.id_card,
          })
        }
      }
      if (!changeSomething) {
        alert('填写项不能为空');
        close = false;
      }
      this.setState({
        check: '',
        password: '',
        phone: '',
        location: {
          province: '',
          city: '',
          district: '',
        },
        real_name: '',
        id_card: '',
      });
      if(close) this.handleClose();
    });
  };

  render() {
    const {classes, store} = this.props;
    const data = this.props.org_data;
    const {province, city, district} = this.state.location;
    const provinceList = store.findSubCity([]);
    const cityList = (province !== '') ? store.findSubCity([province]) : [];
    const districtList = (city !== '') ? store.findSubCity([province, city]) : [];

    return (
      <div className={classes.root}>
        <ExpansionPanel defaultExpanded>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>个人资料</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <Typography className={classes.detail}>昵称：{data.name}</Typography>
            <Typography className={classes.detail}>密码：********</Typography>
            <Button variant={"contained"} className={classes.detail} onClick={this.tryChangePassword}>修改密码</Button>
            <Typography className={classes.detail}>手机：{data.phone}</Typography>
            <Button variant={"contained"} className={classes.detail} onClick={this.tryChangePhone}>修改手机号码</Button>
            <Typography className={classes.detail}>城市：{data.city.join(' ')}</Typography>
            <Button variant={"contained"} className={classes.detail} onClick={this.tryChangeCity}>修改城市</Button>
            <Typography className={classes.detail}>信用：{data.credit}</Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel defaultExpanded>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>实名认证</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            {(data.id_card === undefined || data.id_card.length === 0) &&
            <Button variant={"contained"} className={classes.detail} onClick={this.tryChangeReal}>进行实名认证</Button>}
            {(data.id_card !== undefined && data.id_card.length !== 0) &&
            <Typography className={classes.detail}>姓名：{data.real_name}</Typography>}
            {(data.id_card !== undefined && data.id_card.length !== 0) &&
            <Typography className={classes.detail}>证件：{data.id_card}</Typography>}
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <Button variant={'contained'} color='secondary' onClick={this.logout}>登出</Button>
        <Dialog open={this.state.changePassword}>
          <DialogTitle>修改密码</DialogTitle>
          <DialogContent>
            <DialogContentText>
              请输入旧密码与新密码：
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="旧密码"
              type="password"
              value={this.state.check}
              fullWidth
              onChange={this.changeCheck}
            />
            <TextField
              margin="dense"
              label="新密码"
              type="password"
              value={this.state.password}
              fullWidth
              onChange={this.changePassword}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              取消
            </Button>
            <Button onClick={this.handleUpdate} color="primary">
              提交
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={this.state.changePhone}>
          <DialogTitle>修改手机</DialogTitle>
          <DialogContent>
            <DialogContentText>
              请输入密码与新手机号：
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="密码"
              type="password"
              value={this.state.check}
              fullWidth
              onChange={this.changeCheck}
            />
            <TextField
              margin="dense"
              label="新手机号"
              fullWidth
              value={this.state.phone}
              onChange={this.changePhone}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              取消
            </Button>
            <Button onClick={this.handleUpdate} color="primary">
              提交
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={this.state.changeCity}>
          <DialogTitle>修改城市</DialogTitle>
          <DialogContent>
            <DialogContentText>
              请输入密码，并选取城市地址：
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="密码"
              type="password"
              value={this.state.check}
              fullWidth
              onChange={this.changeCheck}
            />
            <FormControl className={classes.formControl}>
              <Select
                value={province}
                onChange={this.changeProvince}
                displayEmpty
                className={classes.selectEmpty}
              >
                <MenuItem value=''>
                  <em>请选择</em>
                </MenuItem>
                {provinceList.map((name, i) => {
                  return (
                    <MenuItem value={name.name} key={'province' + i}>{name.name}</MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            {cityList.length !== 0 &&
            <FormControl className={classes.formControl}>
              <Select
                value={city}
                onChange={this.changeCity}
                displayEmpty
                className={classes.selectEmpty}
              >
                <MenuItem value=''>
                  <em>请选择</em>
                </MenuItem>
                {cityList.map((name, i) => {
                  return (
                    <MenuItem value={name.name} key={'city' + i}>{name.name}</MenuItem>
                  );
                })}
              </Select>
            </FormControl>}
            {districtList.length !== 0 &&
            <FormControl className={classes.formControl}>
              <Select
                value={district}
                onChange={this.changeDistrict}
                displayEmpty
                className={classes.selectEmpty}
              >
                <MenuItem value=''>
                  <em>请选择</em>
                </MenuItem>
                {districtList.map((name, i) => {
                  return (
                    <MenuItem value={name.name} key={'district' + i}>{name.name}</MenuItem>
                  );
                })}
              </Select>
            </FormControl>}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              取消
            </Button>
            <Button onClick={this.handleUpdate} color="primary">
              提交
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={this.state.changeReal}>
          <DialogTitle>实名认证</DialogTitle>
          <DialogContent>
            <DialogContentText>
              请输入密码，并进行实名信息：
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="密码"
              type="password"
              value={this.state.check}
              fullWidth
              onChange={this.changeCheck}
            />
            <TextField
              margin="dense"
              label="真实姓名"
              value={this.state.real_name}
              fullWidth
              onChange={this.changeRealName}
            />
            <TextField
              margin="dense"
              label="身份证号"
              fullWidth
              value={this.state.id_card}
              onChange={this.changeIdCard}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              取消
            </Button>
            <Button onClick={this.handleUpdate} color="primary">
              提交
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(Settings);