import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({

});

@inject('store')
@observer
class Messages extends Component {
  render() {
    return (<div>Messages</div>);
  }
}

export default withStyles(styles)(Messages);