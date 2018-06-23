import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Radio from '@material-ui/core/Radio';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    width: innerWidth * 0.8 - 60,
    padding: '18px 30px',
    display: 'flex',
  },
  pic: {
    width: innerWidth * 0.4,
    height: innerWidth * 0.225,
    margin: '15px',
    backgroundColor: 'rgb(200,200,200)',
    position: 'relative',
    textAlign: 'center',
  },
  picSrc: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    maxHeight: '100%',
    maxWidth: '100%',
  },
  left: {
    position: 'absolute',
    margin: 'auto',
    top: 0,
    bottom: 0,
    left: 0,
    zIndex: 100,
  },
  right: {
    position: 'absolute',
    margin: 'auto',
    top: 0,
    bottom: 0,
    right: 0,
    zIndex: 100,
  },
  radioBar: {
    position: 'absolute',
    margin: 'auto',
    bottom: '0',
    left: 0,
    right: 0,
    zIndex: 100,
  },
  radio: {
    width: 20,
    height: 20,
  },
  radioIcon: {
    fontSize: 10,
  },
  info: {
    margin: '15px',
    width: innerWidth * 0.4 - 90,
  },
  main_info: {
    width: '100%',
    borderBottom: '1px solid grey',
  },
  sub_info: {
    width: '100%',
  }
});

@inject('store')
@observer
class MainInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeout: 3000,
      showSlider: false,
      selected: 0,
      user: {
        city: [],
        phone: '',
      },
    };
    this.timer = setInterval(this.switchToNextPicture.bind(this), this.state.timeout);
  }
  componentWillMount() {
    const {store} = this.props;
    const item = this.props.org_data;
    store.getUserInfo(item.owner.substr(1), user=>{
      this.setState({
        user: user.user,
      })
    });
  }
  render() {
    const {classes, store} = this.props;
    const item = this.props.org_data;
    const item_pic = item.images;

    return (
      <div className={classes.root}>
        <div className={classes.pic} onMouseEnter={this.stopTimer.bind(this)} onMouseLeave={this.startTimer.bind(this)}>
          <img src={item_pic[this.state.selected]} style={{zIndex:0}} className={classes.picSrc}/>
          {this.state.showSlider && (
            <IconButton className={classes.left} color="secondary" onClick={this.switchToPreviewPicture.bind(this)}>
              <KeyboardArrowLeft />
            </IconButton>
          )}
          {this.state.showSlider && (
            < IconButton className={classes.right} color="secondary" onClick={this.switchToNextPicture.bind(this)}>
              <KeyboardArrowRight />
            </IconButton>
          )}
          {this.state.showSlider && (
            <div className={classes.radioBar}>
              {
                item_pic.map((picture, i) => {
                  return (
                    <Radio checked={this.state.selected === i} onChange={this.handleChange}
                           value={i.toString()} color="secondary" className={classes.radio}
                           icon={<RadioButtonUncheckedIcon className={classes.radioIcon} />}
                           checkedIcon={<RadioButtonCheckedIcon className={classes.radioIcon} />}
                           key={`pictureRadioOnHeadColumn-${i}`} />
                  );
                })
              }
            </div>
          )}
        </div>
        <div className={classes.info}>
          <div className={classes.main_info}>
            <h3>{item.title}</h3>
            <p>{'共享价：￥'+item.price+'/天'}</p>
            <p>{'剩余共享时间：'+item.availableTime+'天'}</p>
          </div>
          <div className={classes.sub_info}>
            <p>{'所在地：'+this.state.user.city.join(' ')}</p>
            <p>{'联系方式：'+this.state.user.phone}</p>
            <p>{'交易方式：'+store.getTransferMethodByTransferCode(item.transfer)}</p>
          </div>
          <Button variant='contained' color='primary'>立即租用</Button>
        </div>
      </div>);
  }

  stopTimer() {
    this.setState({
      showSlider: true,
    });
    clearInterval(this.timer);
  }

  startTimer() {
    this.setState({
      showSlider: false,
    });
    this.timer = setInterval(this.switchToNextPicture.bind(this), this.state.timeout);
  }

  handleChange = event => {
    this.setState({selected: +(event.target.value)});
  };

  switchToNextPicture() {
    const data = this.props.org_data.images;
    if (this.state.selected === data.length - 1) this.setState({selected: 0});
    else this.setState({selected: this.state.selected + 1});
  }

  switchToPreviewPicture() {
    const data = this.props.org_data.images;
    if (this.state.selected === 0) this.setState({selected: data.length - 1});
    else this.setState({selected: this.state.selected - 1});
  }
}

export default withStyles(styles)(MainInfo);