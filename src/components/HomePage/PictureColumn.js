import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Item from '../Common/Item';
import Radio from '@material-ui/core/Radio';
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
});

@inject('store')
@observer
class PictureColumn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeout: 3000,
      showSlider: false,
      selected: 0
    };
    this.timer = setInterval(this.switchToNextPicture, this.state.timeout);
  }

  render() {
    const {classes} = this.props;
    const data = this.props.org_data;
    const current_data = data[this.state.selected];
    return (
      <div className={classes.root} onMouseEnter={this.stopTimer} onMouseLeave={this.startTimer}>
        <Item width={400} height={188} pic={current_data.picSrc} link={`/item/${current_data.id.substr(1)}`} style={{zIndex:0}}/>
        {this.state.showSlider && (
          <IconButton className={classes.left} color="secondary" onClick={this.switchToPreviewPicture}>
            <KeyboardArrowLeft />
          </IconButton>
        )}
        {this.state.showSlider && (
          < IconButton className={classes.right} color="secondary" onClick={this.switchToNextPicture}>
            <KeyboardArrowRight />
          </IconButton>
        )}
        {this.state.showSlider && (
          <div className={classes.radioBar}>
            {
              data.map((picture, i) => {
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
    );
  }

  stopTimer = () => {
    this.setState({
      showSlider: true,
    });
    clearInterval(this.timer);
  };

  startTimer = () => {
    this.setState({
      showSlider: false,
    });
    this.timer = setInterval(this.switchToNextPicture, this.state.timeout);
  };

  handleChange = event => {
    this.setState({selected: +(event.target.value)});
  };

  switchToNextPicture = () => {
    const data = this.props.org_data;
    if (this.state.selected === data.length - 1) this.setState({selected: 0});
    else this.setState({selected: this.state.selected + 1});
  };

  switchToPreviewPicture = () => {
    const data = this.props.org_data;
    if (this.state.selected === 0) this.setState({selected: data.length - 1});
    else this.setState({selected: this.state.selected - 1});
  }
}

export default withStyles(styles)(PictureColumn);