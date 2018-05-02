import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({

});

@inject('store')
@observer
class ItemsRented extends Component {
  render() {
    return (<div>ItemsRented</div>);
  }
}

export default withStyles(styles)(ItemsRented);