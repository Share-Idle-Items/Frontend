import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({

});

@inject('store')
@observer
class Column extends Component {
  render() {
    console.log(this.props.data);
    return (
      <div />
    );
  }
}

export default withStyles(styles)(Column);