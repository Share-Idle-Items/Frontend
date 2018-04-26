import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Radio from 'material-ui/Radio';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const styles = theme => ({
  root: {
    width: '400px',
    height: '188px',
    margin: '6px 30px',
    backgroundColor: 'rgb(200,200,200)',
    position: 'relative',
    textAlign: 'center',
  },
  img: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    margin: "auto",
    top: 0,
    left: 0,
    right: 0,
  },
  left: {
    position: 'absolute',
    margin: 'auto',
    top: 0,
    bottom: 0,
    left: 0,
  },
  right: {
    position: 'absolute',
    margin: 'auto',
    top: 0,
    bottom: 0,
    right: 0,
  },
  radioBar: {
    position: 'absolute',
    margin: 'auto',
    bottom: '0',
    left: 0,
    right: 0,
  },
  radio: {
    width: 20,
    height: 20,
  },
  radioIcon: {
    fontSize: 10,
  },
});

@inject('store')
@observer
class PictureColumn extends Component {
  timer = setInterval(this.switchToNextPicture.bind(this), 2000);

  render() {
    const {classes} = this.props;
    const data = this.props.store.pictureColumnOnHomePage;
    return (
      <div className={classes.root} onMouseEnter={this.stopTimer.bind(this)} onMouseLeave={this.startTimer.bind(this)}>
        <img className={classes.img} src={data.pictures[data.selected].picSrc} />
        <IconButton className={classes.left} color="secondary" onClick={this.switchToPreviewPicture.bind(this)}>
          <KeyboardArrowLeft />
        </IconButton>
        <IconButton className={classes.right} color="secondary" onClick={this.switchToNextPicture.bind(this)}>
          <KeyboardArrowRight />
        </IconButton>
        <div className={classes.radioBar}>
          {
            data.pictures.map((picture,i) => {
              return (
                <Radio
                  checked={data.selected === i}
                  onChange={this.handleChange}
                  value={i.toString()}
                  color="secondary"
                  className={classes.radio}
                  icon={<RadioButtonUncheckedIcon className={classes.radioIcon} />}
                  checkedIcon={<RadioButtonCheckedIcon className={classes.radioIcon} />}
                  key={`pictureRadioOnHeadColumn-${i}`}
                />
              );
            })
          }
        </div>
      </div>
    );
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  startTimer() {
    this.timer = setInterval(this.switchToNextPicture.bind(this), 2000);
  }

  handleChange = event => {
    const data = this.props.store.pictureColumnOnHomePage;
    data.selected = +(event.target.value);
  };

  switchToNextPicture() {
    const data = this.props.store.pictureColumnOnHomePage;
    if (data.selected === data.pictures.length - 1) data.selected = 0;
    else data.selected = data.selected + 1;
  }

  switchToPreviewPicture() {
    const data = this.props.store.pictureColumnOnHomePage;
    if (data.selected === 0) data.selected = data.pictures.length - 1;
    else data.selected = data.selected - 1;
  }
}

export default withStyles(styles)(PictureColumn);