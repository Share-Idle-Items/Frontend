import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({

});

@inject('store')
@observer
class ItemPage extends Component {
  render() {
    return (<div>ItemPage</div>);
  }
}

export default withStyles(styles)(ItemPage);