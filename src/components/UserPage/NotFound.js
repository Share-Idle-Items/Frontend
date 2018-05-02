import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({

});

@inject('store')
@observer
class NotFound extends Component {
  render() {
    return (<div>NotFound</div>);
  }
}

export default withStyles(styles)(NotFound);