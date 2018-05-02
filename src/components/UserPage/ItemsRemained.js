import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({

});

@inject('store')
@observer
class ItemsRemained extends Component {
  render() {
    return (<div>ItemsRemained</div>);
  }
}

export default withStyles(styles)(ItemsRemained);