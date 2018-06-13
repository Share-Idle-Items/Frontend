import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Dashboard from '@material-ui/icons/Dashboard';
import Camera from '@material-ui/icons/Camera';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import Alarm from '@material-ui/icons/Alarm';

const styles = theme => ({
  root: {},
  columnWithLeftAlign: {
    display: 'flex',
    height: '40px',
    backgroundColor: 'rgb(94,87,85)',
    margin: '6px 0',
    padding: '0 10px',
    color: 'rgb(230,230,230)',
    alignItems: 'center',
  },
  columnWithCenterAlign: {
    display: 'flex',
    height: '50px',
    backgroundColor: 'rgb(94,87,85)',
    margin: '6px 0',
    color: 'rgb(230,230,230)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    color: 'rgb(230,230,230)',
  },
  columnTitle: {
    margin: '0 4px',
  }
});

@inject('store')
@observer
class TypeColumn extends Component {
  render() {
    const {classes, store} = this.props;
    let data = this.props.org_data;
    return (
      <div className={classes.root}>
        <div key={`typeColumnsOnHomePage-head`}
             className={classes.columnWithCenterAlign}>
          <Grid>{TypeColumn.getIcon('Dashboard')}</Grid>
          <Grid>
            <Typography variant="title" className={classes.columnTitle} noWrap color="inherit">
              闲置分类
            </Typography>
          </Grid>
        </div>
        {
          data.map((typeColumn, i) => {
            return (
              <div key={`typeColumnsOnHomePage-${i}`}
                   className={classes.columnWithLeftAlign}>
                <Grid>{TypeColumn.getIcon(typeColumn.icon)}</Grid>
                <Grid>
                  <Typography variant="title" className={classes.columnTitle} noWrap color="inherit">
                    {typeColumn.title}
                  </Typography>
                </Grid>
                {typeColumn.subtitles.map((sub, j) => {
                  return (
                    <Button size="small" className={classes.link}
                            key={`typeItemsOnHomePage-c${i}i${j}`}>
                      {sub}
                    </Button>
                  )
                })}
              </div>
            );
          })
        }
      </div>
    );
  }

  static getIcon(iconName) {
    switch (iconName) {
      case "Dashboard":
        return (<Dashboard />);
      case "Camera":
        return (<Camera />);
      case "ShoppingBasket":
        return (<ShoppingBasket />);
      case "Alarm":
        return (<Alarm />);
    }
  }
}

export default withStyles(styles)(TypeColumn);