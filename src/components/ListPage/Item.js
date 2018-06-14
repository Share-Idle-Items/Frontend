import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
  },
});

@inject('store')
@observer
class Item extends Component {
  render() {
    const {classes, store} = this.props;
    const {location, push, goBack} = store.routing;

    return (<div className={classes.root}>
      Item
    </div>);
  }
}

export default withStyles(styles)(Item);