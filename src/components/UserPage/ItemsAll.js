import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({

});

@inject('store')
@observer
class ItemsAll extends Component {
  render() {
    return (<div>ItemsAll</div>);
  }
}

export default withStyles(styles)(ItemsAll);