import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const styles = theme => ({
  root: {
    minHeight: innerHeight,
    width: window.innerWidth * 0.8,
    marginLeft: window.innerWidth * 0.1,
    padding: '80px 0',
  },
  bar: {
    width: window.innerWidth * 0.8,
    height: '81px',
  },
  filter: {
    width: window.innerWidth * 0.8 - 10,
    display: 'flex',
    height: '34px',
    lineHeight: '34px',
    padding: '3px 5px',
    margin: '0',
    borderBottom: '1px #afafaf solid',
  },
  flex: {
    flex: 1,
  },
  button: {
    margin: '5px',
    minHeight: '25px',
    height: '25px',
    padding: '3px',
  },
  filterItem: {
    height: '34px',
    padding: '0 12px',
    lineHeight: '34px',
    borderRight: '1px #cfcfcf solid',
  },
  cityPicker: {
    display: 'flex',
    height: '34px',
    lineHeight: '34px',
    padding: '0 12px',
  },
  record: {
    display: 'flex',
    height: '34px',
    lineHeight: '34px',
    padding: '0 12px',
    '& p': {
      height: '34px',
      lineHeight: '34px',
      margin: 0,
      color: '#ff4440',
    }
  },
  formControl: {
    margin: '0 5px',
    minWidth: '80px',
  },
  selectEmpty: {
    marginTop: 0,
  },
  textField: {
    width: 'auto',
    maxWidth: '50px',
    height: '34px',
    lineHeight: '34px',
    margin: '0 3px',
  },
  sort: {
    display: 'flex',
    height: '34px',
    lineHeight: '34px',
    padding: '3px',
    margin: '0',
  },
  tabsRoot: {
    borderBottom: '1px solid #e8e8e8',
  },
  tabsIndicator: {
    backgroundColor: '#1890ff',
  },
  tabRoot: {
    textTransform: 'initial',
    height: '34px',
    minHeight: '34px',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing.unit * 4,
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$tabSelected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },
  tabSelected: {},
  items: {
    display: 'flex',
    flexWrap: 'wrap',
    width: innerWidth * 0.6,
    marginTop: '40px',
    marginBottom: '40px',
    marginLeft: innerWidth * 0.1,
  },
  item: {
    width: innerWidth * 0.13,
    height: innerWidth * 0.18,
    margin: '10px',
  },
  itemButton: {
    width: '100%',
    height: '100%',
    padding: '0',
  },
  itemImgArea: {
    position: 'absolute',
    top: 0,
    width: innerWidth * 0.13,
    height: innerWidth * 0.13,
    borderBottom: '1px grey solid',
  },
  itemImg: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    maxHeight: '100%',
    maxWidth: '100%',
  },
  itemInfo: {
    position: 'absolute',
    bottom: 0,
    width: innerWidth * 0.13,
    height: innerWidth * 0.05,
    display: 'flex',
    flexWrap: 'wrap',
    '& p': {
      width: innerWidth * 0.06,
      margin: 0,
    },
    '& h4': {
      width: innerWidth * 0.13,
      margin: '4px 0',
    },
    '& h5': {
      fontWeight: '1px',
      width: innerWidth * 0.13,
      margin: '0',
    },
  },
  pageControll: {
    height: '34px',
    lineHeight: '34px',
    padding: '3px',
    display: 'flex',
  },
  page: {
    height: '34px',
    lineHeight: '34px',
    padding: '0 5px',
    minWidth: '4px',
  },
  pageText: {
    minWidth: '4px',
    width: '20px',
    maxWidth: '50px',
    height: '34px',
    lineHeight: '34px',
    margin: '0 3px',
  }
});

@inject('store')
@observer
class ListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sort: 0,
      price: [0, 0],
      time: [0, 0],
      location: {
        province: '',
        city: '',
        district: '',
      },
      needRefresh: true,
      allPage: 0,
      itemsNumOnOnePage: 24,
      page: 0,
      typePage: 1,
    }
  }

  chooseSort = (event, value) => {
    this.setState({
      sort: value,
    });
    this.resort();
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

  changePrice = (which) => (event) => {
    const price = this.state.price;
    price[which] = event.target.value;
    this.setState({
      price: price,
    })
  };

  changeTime = (which) => (event) => {
    const time = this.state.time;
    time[which] = event.target.value;
    this.setState({
      time: time,
    })
  };

  tryFilter = () => {
    const params = this.props.match.params;
    const {location, push, goBack} = this.props.store.routing;
    const key = params.key;
    const price = `p${this.state.price[0]}~${this.state.price[1]}`;
    const time = `t${this.state.time[0]}~${this.state.time[1]}`;
    let city = 'c';
    if (this.state.location.province.length !== 0) city += this.state.location.province;
    if (this.state.location.city.length !== 0) city += ' ' + this.state.location.city;
    if (this.state.location.district.length !== 0) city += ' ' + this.state.location.district;
    push(`/search/${key}/${price}/${time}/${city}`);
    this.setState({needRefresh: true});
  };

  changePage = (d_page) => () => {
    console.log(this.state.typePage, d_page);
    this.setState({
      page: this.state.page + d_page,
      typePage: this.state.page + d_page + 1,
    })
  };

  jumpPage = (page) => () => {
    page = parseInt(page);
    if (page < 1) return;
    if (page > this.state.allPage) return;
    this.setState({
      page: page - 1,
      typePage: page,
    })
  };

  changeTypePage = (event) => {
    this.setState({
      typePage: event.target.value,
    })
  };

  testJumpPage = (event) => {
    if (event.keyCode === 13)
      jumpPage(this.state.typePage);
  };

  resort = () => {
    let cmp = (a, b) => {
      switch (this.state.sort) {
        case 0:
          return b.match_level - a.match_level;
        case 1:
          return b.availableTime - a.availableTime;
        case 2:
          return a.price - b.price;
        case 3:
          return b.price - a.price;
      }
    };

    this.itemList.sort(cmp);
    console.log(this.itemList);
  };

  jumpItem = (id) => () => {
    this.props.store.routing.push('/item/'+id.substr(1));
  };

  render() {
    const {classes, store} = this.props;
    const params = this.props.match.params;
    const key = params.key.substr(1), price = params.price.substr(1), time = params.time.substr(1),
      city_filter = params.city.substr(1);
    if (this.state.needRefresh) {
      this.itemList = store.getItems(key, price, time, city_filter);
      this.setState({
        needRefresh: false,
        allPage: parseInt(Math.ceil(this.itemList.length / this.state.itemsNumOnOnePage)),
        page: 0,
        typePage: 1,
      });
      this.resort();
    }
    const {province, city, district} = this.state.location;
    const provinceList = store.findSubCity([]);
    const cityList = (province !== '') ? store.findSubCity([province]) : [];
    const districtList = (city !== '') ? store.findSubCity([province, city]) : [];
    return (<div className={classes.root}>
      <Paper className={classes.bar} elevation={4}>
        <div className={classes.filter}>
          筛选：
          <div className={classes.filterItem}>
            ￥
            <TextField
              className={classes.textField} placeholder={'0'} onChange={this.changePrice(0)}
            />
            ~
            <TextField
              className={classes.textField} placeholder={'+∞'} onChange={this.changePrice(1)}
            />
            /天
          </div>
          <div className={classes.filterItem}>
            剩
            <TextField
              className={classes.textField} placeholder={'0'} onChange={this.changeTime(0)}
            />
            ~
            <TextField
              className={classes.textField} placeholder={'+∞'} onChange={this.changeTime(1)}
            />
            天
          </div>
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
          <div className={classes.flex} />
          <div className={classes.record}>
            共找到{<p>{this.itemList.length}</p>}记录。
          </div>
          <Button variant='outlined' color={"primary"} className={classes.button} onClick={this.tryFilter}>确定</Button>
        </div>
        <div className={classes.sort}>
          排序：
          <Tabs
            value={this.state.sort}
            indicatorColor="primary"
            textColor="primary"
            onChange={this.chooseSort}
            className={{root: this.tabsRoot, indicator: classes.tabsIndicator}}
          >
            <Tab label="推荐" classes={{root: classes.tabRoot, selected: classes.tabSelected}} />
            <Tab label="剩余时间长" classes={{root: classes.tabRoot, selected: classes.tabSelected}} />
            <Tab label="价格上升" classes={{root: classes.tabRoot, selected: classes.tabSelected}} />
            <Tab label="价格下降" classes={{root: classes.tabRoot, selected: classes.tabSelected}} />
          </Tabs>
        </div>
      </Paper>
      <div className={classes.items}>
        {
          this.itemList.map((item, i) => {
            if (this.state.page * this.state.itemsNumOnOnePage <= i && i < (this.state.page + 1) * this.state.itemsNumOnOnePage) {
              return (<Paper key={'item'+i} className={classes.item} elevation={4}>
                <Button className={classes.itemButton} onClick={this.jumpItem(item.id)}>
                  <div className={classes.itemImgArea}>
                    <img src={item.images[0]} className={classes.itemImg}/>
                  </div>
                  <div className={classes.itemInfo}>
                    <h4>{item.title}</h4>
                    <p>￥{item.price}/天</p>
                    <p>剩余{item.availableTime}天</p>
                    <h5>{item.city.join(' ')}</h5>
                  </div>
                </Button>
              </Paper>);
            }
          })
        }
      </div>
      <Paper className={classes.pageControll} elevation={4}>
        页码：
        {this.state.page >= 3 &&
        <Button variant={"text"} className={classes.page} onClick={this.jumpPage(1)}>1</Button>}
        {this.state.page >= 4 &&
        <div>...</div>}
        {this.state.page >= 2 &&
        <Button variant={"text"} className={classes.page} onClick={this.changePage(-2)}>{this.state.page - 1}</Button>}
        {this.state.page >= 1 &&
        <Button variant={"text"} className={classes.page} onClick={this.changePage(-1)}>{this.state.page}</Button>}
        <TextField className={classes.pageText} value={this.state.typePage} onChange={this.changeTypePage}
                   onKeyDown={this.testJumpPage} />
        {this.state.page < this.state.allPage - 1 &&
        <Button variant={"text"} className={classes.page} onClick={this.changePage(1)}>{this.state.page + 2}</Button>}
        {this.state.page < this.state.allPage - 2 &&
        <Button variant={"text"} className={classes.page} onClick={this.changePage(2)}>{this.state.page + 3}</Button>}
        {this.state.page < this.state.allPage - 4 &&
        <div>...</div>}
        {this.state.page < this.state.allPage - 3 &&
        <Button variant={"text"} className={classes.page}
                onClick={this.jumpPage(this.state.allPage)}>{this.state.allPage}</Button>}
        <div className={classes.flex} />
        <div className={classes.record}>共<p>{this.state.allPage}</p>页</div>
      </Paper>
    </div>);
  }
}

export default withStyles(styles)(ListPage);