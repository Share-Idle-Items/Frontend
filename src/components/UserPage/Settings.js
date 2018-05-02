import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({

});

@inject('store')
@observer
class Settings extends Component {
  render() {
    return (<div>Settings</div>);
  }
}

export default withStyles(styles)(Settings);