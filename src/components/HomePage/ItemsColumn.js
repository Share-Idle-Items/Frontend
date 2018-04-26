import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import ButtonBase from 'material-ui/ButtonBase';
import Typography from 'material-ui/Typography';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const styles = theme => ({
  root: {
    margin: '10px',
    position: 'relative'
  },
  content: {
    width: '800px',
    margin: 'auto',
    left: 0,
    right: 0,
  },
  title: {
    lineHeight: '20px',
    fontSize: '15px',
    borderBottom: '1px black solid',
  },
  items: {
    width: 'auto',
    height: '200px',
    margin: '5px 0',
    position: 'relative',
  },
  item: {
    margin: '0 10px',
    position: 'relative',
    height: '200px',
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $itemBackdrop': {
        opacity: 0.15,
      },
    },
  },
  focusVisible: {},
  itemSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  itemPic: {
    width: '140px',
    height: '180px',
  },
  itemBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.05,
    transition: theme.transitions.create('opacity'),
  },
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.black,
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing.unit}px ${theme.spacing.unit}px 0`,
  },
  left: {
    position: 'absolute',
    margin: 'auto',
    top: 0,
    bottom: 0,
    left: '-40px',
  },
  right: {
    position: 'absolute',
    margin: 'auto',
    top: 0,
    bottom: 0,
    right: '-40px',
  },
});

@inject('store')
@observer
class ItemsColumn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSlider: false,
    };
  }

  render() {
    const {classes, data} = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.content}>
          <div className={classes.title}>{data.title}</div>
          <div className={classes.items} onMouseEnter={this.showSlider.bind(this)}
               onMouseLeave={this.hideSlider.bind(this)}>
            {
              data.items.map((item, i) => {
                return (i >= data.startIndex && i < data.startIndex + 5) && (
                  <ButtonBase focusRipple key={`itemOnHomePage-${data.title}-${i}`}
                              className={classes.item}
                              focusVisibleClassName={classes.focusVisible}
                              style={{width: '140px'}}>
                    <span className={classes.itemSrc}>
                      <img className={classes.itemPic} src={item.picSrc} />
                    </span>
                    <span className={classes.itemBackdrop} />
                    <span className={classes.imageButton}>
                      <Typography component="span" variant="subheading" color="inherit"
                                  className={classes.imageTitle} >
                        {item.title}
                      </Typography>
                    </span>
                  </ButtonBase>
                );
              })
            }
            {this.state.showSlider && data.startIndex > 0 &&
            (<IconButton className={classes.left} color="secondary" onClick={this.slideLeft.bind(this)}>
              <KeyboardArrowLeft />
            </IconButton>)
            }
            {this.state.showSlider && data.startIndex + 5 < data.items.length &&
            (<IconButton className={classes.right} color="secondary" onClick={this.slideRight.bind(this)}>
              <KeyboardArrowRight />
            </IconButton>)
            }
          </div>
        </div>
      </div>
    );
  }

  showSlider() {
    this.setState({
      showSlider: true,
    })
  }

  hideSlider() {
    this.setState({
      showSlider: false,
    })
  }

  slideLeft() {
    const {data} = this.props;
    if (data.startIndex > 0) data.startIndex--;
  }

  slideRight() {
    const {data} = this.props;
    if (data.startIndex + 5 < data.items.length) data.startIndex++;
  }
}

export default withStyles(styles)(ItemsColumn);
