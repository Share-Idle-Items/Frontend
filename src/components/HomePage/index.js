import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({

});

@inject('store')
@observer
class HomePage extends Component {
  render() {
    return (<div>HomePage</div>);
  }
}

export default withStyles(styles)(HomePage);