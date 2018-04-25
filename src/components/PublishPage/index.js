import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({

});

@inject('store')
@observer
class PublishPage extends Component {
  render() {
    return (<div>PublishPage</div>);
  }
}

export default withStyles(styles)(PublishPage);