import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Copyright from '@material-ui/icons/Copyright';
import BottomNavigation from '@material-ui/core/BottomNavigation';

const styles = {
  root: {
    minHeight: 0,
    height: '20px',
    width: '100%',
    borderTop: '1px grey solid',
  },
  flex: {
    flex: 1,
  }
};

@inject('store')
@observer
class CopyRight extends Component {
  render() {
    const {classes} = this.props;
    return (
      <BottomNavigation className={classes.root}>
        <div className={classes.flex} />
        <Typography variant="subheading" color="inherit">
          Copyright
        </Typography>
        <Copyright />
        <Typography variant="subheading" color="inherit">
          2018 版权所有
        </Typography>
        <div className={classes.flex} />
      </BottomNavigation>
    );
  }
}

export default withStyles(styles)(CopyRight);