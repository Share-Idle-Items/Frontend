import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  item: {
    margin: '0',
    position: 'relative',
    height: '200px',
    width: '140px',
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
  itemSrc: {
    position: 'absolute',
    top: 0,
    width: '140px',
    height: '168px',
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  itemPic: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    maxHeight: '100%',
    maxWidth: '100%',
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
});

@inject('store')
@observer
class Item extends Component {
  render() {
    const {classes} = this.props;
    const {location, goBack, push} = this.props.store.routing;
    const width = this.props.width;
    const height = this.props.height;
    const title = this.props.title;
    const pic = this.props.pic;
    const img_height = title === undefined ? height : (height - 32);
    const link = this.props.link;
    const margin = this.props.margin === undefined ? '0': this.props.margin;
    return (
      <ButtonBase focusRipple key={`itemOnHomePage-${title}`} focusVisibleClassName={classes.focusVisible}
                  style={{width: width + 'px', height: height + 'px', margin: margin}} className={classes.item}
                  onClick={() => {
                    push(link)
                  }}>
        <div className={classes.itemSrc} style={{width: width + 'px', height: img_height + 'px'}}>
          <img className={classes.itemPic} src={pic} />
        </div>
        <span className={classes.itemBackdrop} />
        <span className={classes.imageButton}> {
          title !== undefined &&
          <Typography component="span" variant="subheading" color="inherit"
                      className={classes.imageTitle}>
            {title}
          </Typography>}
        </span>
      </ButtonBase>
    );
  }
}

export default withStyles(styles)(Item);