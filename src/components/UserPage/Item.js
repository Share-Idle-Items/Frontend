import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles } from 'material-ui/styles';
import ButtonBase from 'material-ui/ButtonBase';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: {
    position: 'relative',
    margin: '20px 0',
    padding: '0 5%',
    height: '200px',
    width: '90%',
  },
  btnBase: {
    position: 'absolute',
    margin: 'auto',
    left: 0,
    right: 0,
    top: 0,
    width: '80%',
    height: '200px',
    backgroundColor: 'rgb(94, 87, 85)',
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.4,
      },
    },
  },
  imageBackdrop: {
    position: 'absolute',
    left: 170,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0,
    transition: theme.transitions.create('opacity'),
  },
  focusVisible: {},
  image: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageSrc: {
    width: '170px',
    height: '200px',
  },
  information: {
    position: 'absolute',
    left: 170,
    top: 0,
    height: 180,
    padding: 10,
  },
  title: {
    display: 'flex',
    margin: 5,
    color: theme.palette.common.white,
  },
  description: {
    display: 'flex',
    margin: 5,
    color: theme.palette.common.white,
  },
  details: {
    display: 'flex',
    margin: 5,
    color: theme.palette.common.white,
  },
  text: {
    whiteSpace: 'nowrap',
    maxWidth: '750px',
    overflow: 'hidden',
  }
});

@inject('store')
@observer
class Item extends Component {
  render() {
    const {classes, data} = this.props;

    return (<div className={classes.root}>
      <ButtonBase focusRipple className={classes.btnBase} focusVisibleClassName={classes.focusVisible}>
        <span className={classes.image}>
          <img className={classes.imageSrc} src={data.picSrc} />
        </span>
        <span className={classes.imageBackdrop} />
        <div className={classes.information}>
          <span className={classes.title}>
            <Typography nowrap component="span" variant="display1" color="inherit" className={classes.text}>
              {data.title}
            </Typography>
          </span>
          <span className={classes.description}>
            <Typography nowrap component="span" variant="subheading" color="inherit" className={classes.text}>
              {data.description}
            </Typography>
          </span>
          {['lent', 'remained', 'borrowed', 'wanted'].includes(data.details.type) && <span className={classes.details}>
            <Typography nowrap component="span" variant="subheading" color="inherit" className={classes.text}>
              价格：￥{data.details.price}/天
            </Typography>
          </span>}
          {['remained'].includes(data.details.type) && <span className={classes.details}>
            <Typography nowrap component="span" variant="subheading" color="inherit" className={classes.text}>
              借出次数：{data.details.lentTimes}
            </Typography>
          </span>}
          {['remained'].includes(data.details.type) && <span className={classes.details}>
            <Typography nowrap component="span" variant="subheading" color="inherit" className={classes.text}>
              赚取：￥{data.details.gained}
            </Typography>
          </span>}
          {['lent'].includes(data.details.type) && <span className={classes.details}>
            <Typography nowrap component="span" variant="subheading" color="inherit" className={classes.text}>
              借出时间：{data.details.startTime.year}年{data.details.startTime.month}月{data.details.startTime.day}日　
              {data.details.startTime.hour}:{data.details.startTime.minute}:{data.details.startTime.second}
            </Typography>
          </span>}
          {['borrowed', 'history'].includes(data.details.type) && <span className={classes.details}>
            <Typography nowrap component="span" variant="subheading" color="inherit" className={classes.text}>
              借入时间：{data.details.startTime.year}年{data.details.startTime.month}月{data.details.startTime.day}日　
              {data.details.startTime.hour}:{data.details.startTime.minute}:{data.details.startTime.second}
            </Typography>
          </span>}
          {['lent', 'borrowed'].includes(data.details.type) && <span className={classes.details}>
            <Typography nowrap component="span" variant="subheading" color="inherit" className={classes.text}>
              最晚归还：{data.details.endTime.year}年{data.details.endTime.month}月{data.details.endTime.day}日　
              {data.details.endTime.hour}:{data.details.endTime.minute}:{data.details.endTime.second}
            </Typography>
          </span>}
          {['history'].includes(data.details.type) && <span className={classes.details}>
            <Typography nowrap component="span" variant="subheading" color="inherit" className={classes.text}>
              归还时间：{data.details.endTime.year}年{data.details.endTime.month}月{data.details.endTime.day}日　
              {data.details.endTime.hour}:{data.details.endTime.minute}:{data.details.endTime.second}
            </Typography>
          </span>}
        </div>
      </ButtonBase>
    </div>);
  }
}

export default withStyles(styles)(Item);