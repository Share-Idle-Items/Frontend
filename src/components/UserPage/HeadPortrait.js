import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    position: 'absolute',
    width: '200px',
    height: '240px',
    top: '80px',
    borderBottom: '1px black solid'
  },
  image: {
    position: 'absolute',
    margin: 'auto',
    left: 0,
    right: 0,
    top: 10,
    width: '150px',
    height: '170px',
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.4,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        opacity: 1,
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imagePic: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageSrc: {
    width: '150px',
    height: '170px',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
    opacity: 0,
    transition: theme.transitions.create('opacity'),
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    opacity: 0,
    transition: theme.transitions.create('opacity'),
  },
  userName: {
    position: 'absolute',
    margin: 'auto',
    left: 0,
    right: 0,
    bottom: 20,
    textAlign: 'center',
  }
});

@inject('store')
@observer
class HeadPortrait extends Component {
  render() {
    const {classes} = this.props;
    const data = this.props.org_data;

    return (<div className={classes.root}>
      <ButtonBase focusRipple className={classes.image} focusVisibleClassName={classes.focusVisible}>
        <span className={classes.imagePic}>
          <img className={classes.imageSrc} src={data.portrait} />
        </span>
        <span className={classes.imageBackdrop} />
        <span className={classes.imageButton}>
          <Typography component="span" variant="subheading" color="inherit" className={classes.imageTitle}>
            编辑头像
            <span className={classes.imageMarked} />
          </Typography>
        </span>
      </ButtonBase>
      <Typography variant="subheading" color="inherit" className={classes.userName}>
        {data.name}
      </Typography>
    </div>);
  }
}

export default withStyles(styles)(HeadPortrait);