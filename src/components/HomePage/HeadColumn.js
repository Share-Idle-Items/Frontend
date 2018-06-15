import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
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
    let data = this.props.org_data;
    return (
      <div className={classes.root}>
        <div className={classes.flex} />
        <TypeColumn org_data={data.typeColumns}/>
        <PictureColumn org_data={data.pictureColumn}/>
        <div className={classes.flex} />
      </div>
    )
  }
}

export default withStyles(styles)(HeadColumn);