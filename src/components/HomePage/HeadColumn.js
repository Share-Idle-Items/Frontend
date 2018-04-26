import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles } from 'material-ui/styles';
import TypeColumn from './TypeColumn';
import PictureColumn from './PictureColumn';

const styles = theme => ({
  root: {
    height: '200px',
    display: 'flex',
  },
  flex: {
    flex: 1,
  },
});

@inject('store')
@observer
class HeadColumn extends Component {
  render() {
    const { classes, store } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.flex} />
        <TypeColumn />
        <PictureColumn />
        <div className={classes.flex} />
      </div>
    )
  }
}

export default withStyles(styles)(HeadColumn);