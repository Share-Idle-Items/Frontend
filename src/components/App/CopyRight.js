import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Copyright from '@material-ui/icons/Copyright';

const styles = theme => ({
  root: {
    minHeight: 0,
    height: '20px',
  },
  flex: {
    flex: 1,
  }
});

@inject('store')
@observer
class CopyRight extends Component {
  render() {
    const {classes} = this.props;
    return (
      <AppBar position="static" color="default" className={classes.root}>
        <Toolbar className={classes.root}>
          <div className={classes.flex}/>
          <Typography variant="subheading" color="inherit">
            Copyright
          </Typography>
          <Copyright />
          <Typography variant="subheading" color="inherit">
            2018 版权所有 爱抄就抄
          </Typography>
          <div className={classes.flex}/>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(CopyRight);