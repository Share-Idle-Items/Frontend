import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import NumberFormat from 'react-number-format';
import Button from '@material-ui/core/Button';
import Dropzone from 'react-dropzone';

const styles = theme => ({
  root: {
    minHeight: innerHeight - 190,
    display: 'flex',
    width: innerWidth * 0.8,
    marginLeft: innerWidth * 0.1,
    padding: '80px 0',
  },
  left: {
    flex: 1,
    paddingLeft: innerWidth * 0.04,
    paddingRight: innerWidth * 0.04,
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
  right: {
    flex: 1,
  },
  title: {
    display: 'flex',
    height: '32px',
    lineHeight: '32px',
    marginTop: '10px',
  },
  pictures: {
    display: 'default',
    lineHeight: '32px',
    marginTop: '10px',
  },
  picArea: {
    width: innerWidth * 0.3,
    marginLeft: '50px',
    display: 'flex',
    flexWrap: 'wrap',
  },
  picButton: {
    width: innerWidth * 0.1 - 17,
    height: innerWidth * 0.1 - 17,
    padding: '2px',
    margin: '5px',
  },
  pic: {
    width: innerWidth * 0.1 - 21,
    height: innerWidth * 0.1 - 21,
  },
  upload: {
    width: innerWidth * 0.3 - 40,
    height: '100px',
    marginTop: '5px',
    marginLeft: '55px',
    border: '2px dashed grey',
    borderRadius: '10px',
    textAlign: 'center',
    lineHeight: '100px',
    '& p': {
      margin: 0
    }
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: innerWidth * 0.3 - 40,
  },
  description: {
    display: 'flex',
    lineHeight: '32px',
    marginTop: '10px',
  },
  table: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: innerWidth * 0.3 - 40,
    height: '32px',
    lineHeight: '32px',
  },
  button: {
    marginTop: theme.spacing.unit * 5,
  },
  input: {
    display: 'none',
  },
  infoItem: {
    marginTop: '10px',
  },
});

function NumberFormatCustom(props) {
  const {inputRef, onChange, ...other} = props;

  return (
    <NumberFormat
      {...other}
      ref={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      format={'### #### ####'}
    />
  );
}

@inject('store')
@observer
class PublishPage extends Component {
  constructor(props) {
    super(props);
    const {store} = this.props;
    if (store.user === undefined) {
      store.routing.push('/login');
    } else {
      const user = store.getUserInfo().user;
      this.state = {
        location: {
          province: user.city[0] !== undefined? user.city[0]: '',
          city: user.city[1] !== undefined? user.city[1]: '',
          district: user.city[2] !== undefined? user.city[2]: '',
        },
        pictures: [],
        picSrc: [],
        title: '',
        description: '',
        price: 0,
        time: 5,
        transfer: ['自取', '邮寄', '面交'],
        phone: user.phone,
      }
    }
  }

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

  changeTitle = event => {
    this.setState({
      title: event.target.value,
    })
  };

  changeDescription = event => {
    this.setState({
      description: event.target.value,
    })
  };

  changePrice = event => {
    this.setState({
      price: +event.target.value,
    })
  };

  changeTime = event => {
    this.setState({
      time: +event.target.value,
    })
  };

  changeTransfer = event => {
    this.setState({
      transfer: event.target.value,
    })
  };

  changePhone = event => {
    this.setState({
      phone: +event.target.value,
    })
  };

  changeImg = files => {
    let pics = this.state.pictures;
    if (pics.length + files.length > 5) {
      alert("最多上传5张图片哦~");
      return;
    }
    for (let file of files) pics.push(file);
    this.setState({
      pictures: pics,
    });
    this.loadImg();
  };

  loadImg = () => {
    const reader = [];
    const that = this;
    for (let [i, pic] of this.state.pictures.entries()) {
      reader[i] = new FileReader();
      reader[i].readAsDataURL(pic);
      reader[i].onload = function (e) {
        const cp_picSrc = that.state.picSrc;
        cp_picSrc[i] = this.result;
        that.setState({
          picSrc: cp_picSrc,
        });
      };
    }
  };

  removeImg = index => () => {
    let pics = this.state.pictures;
    pics.splice(index, 1);
    this.setState({
      pictures: pics,
    });
    pics = this.state.picSrc;
    pics.splice(index, 1);
    this.setState({
      picSrc: pics,
    });
  };

  tryPublish = () => {
    push('/home');
  };

  render() {
    const {classes, store} = this.props;
    const {location, push, goBack} = store.routing;
    const {province, city, district} = this.state.location;
    const provinceList = store.findSubCity([]);
    const cityList = (province !== '') ? store.findSubCity([province]) : [];
    const districtList = (city !== '') ? store.findSubCity([province, city]) : [];


    return (<div className={classes.root}>
      <div className={classes.left}>
        <div className={classes.cityPicker}>
          城市：
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
        </div>
        <div className={classes.title}>
          标题：
          <TextField
            className={classes.textField}
            placeholder='起个名字，让别人一眼就辨识出你的小可爱~'
            value={this.state.title}
            onChange={this.changeTitle}
          />
        </div>
        <div className={classes.pictures}>
          <p>图片：（{this.state.pictures.length}/5）{this.state.pictures.length > 0 && '单击图片删除'}</p><br />
          <div className={classes.picArea}>
            {
              this.state.pictures.map((pic, i)=>{
                console.log(pic);
                return (<Button key={'publish_pic_'+i} className={classes.picButton} onClick={this.removeImg(i)}>
                  <img className={classes.pic} src={this.state.picSrc[i]} />
                </Button>);
              })
            }
          </div>
          {this.state.pictures.length < 5 &&
          <Dropzone multiple={true} accept="image/*" onDropAccepted={this.changeImg}
                    className={classes.upload}>
            <p>点击选择文件，或拖拽图片到这里~</p>
          </Dropzone>
          }
        </div>
      </div>
      <div className={classes.right}>
        <div className={classes.infoItem}>
          出租价格：
          <FormControl className={classes.table}>
            <Input
              value={this.state.price}
              onChange={this.changePrice}
              startAdornment={<InputAdornment position="start">￥</InputAdornment>}
              endAdornment={<InputAdornment position="end">/天</InputAdornment>}
            />
          </FormControl>
        </div>
        <div className={classes.infoItem}>
          剩余时间：
          <FormControl className={classes.table}>
            <Input
              value={this.state.time}
              onChange={this.changeTime}
              endAdornment={<InputAdornment position="end">天</InputAdornment>}
            />
          </FormControl>
        </div>
        <div className={classes.infoItem}>
          租借方式：
          <FormControl className={classes.table}>
            <Select
              multiple
              value={this.state.transfer}
              onChange={this.changeTransfer}
              input={<Input />}
              renderValue={selected => selected.join('，')}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 48 * 4.5 + 8,
                    width: 250,
                  },
                },
              }}
            >
              <MenuItem value={'自取'}>
                <Checkbox checked={this.state.transfer.indexOf('自取') > -1} />
                <ListItemText primary={'租取方自取'} />
              </MenuItem>
              <MenuItem value={'邮寄'}>
                <Checkbox checked={this.state.transfer.indexOf('邮寄') > -1} />
                <ListItemText primary={'出租方送出'} />
              </MenuItem>
              <MenuItem value={'面交'}>
                <Checkbox checked={this.state.transfer.indexOf('面交') > -1} />
                <ListItemText primary={'当面交接'} />
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={classes.infoItem}>
          联系方式：
          <TextField
            value={this.state.phone}
            onChange={this.changePhone}
            InputProps={{
              inputComponent: NumberFormatCustom,
            }}
            className={classes.table}
          />
        </div>
        <div className={classes.description}>
          细节描述：
          <TextField
            id="multiline-flexible"
            multiline
            rowsMax="6"
            placeholder="可以输入多行哦~"
            value={this.state.description}
            onChange={this.changeDescription}
            className={classes.textField}
          />
        </div>
        <Button color='primary' variant='contained' className={classes.button}
                onClick={this.tryPublish}>确定发布</Button>
      </div>
    </div>);
  }
}

export default withStyles(styles)(PublishPage);