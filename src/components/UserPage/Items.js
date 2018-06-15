import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import Item from './Item';

const styles = theme => ({
  root: {
    width: innerWidth * 0.8 - 200,
    height: window.innerHeight - 80,
    overflowY: 'auto',
    overflowX: 'hidden',
    '&::-webkit-scrollbar': {
      width: '10px',
      height: '10px',
    },
    '&::-webkit-scrollbar-button': {
      display: 'none',
    },
    '&::-webkit-scrollbar-track': {
      WebkitBoxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
      borderRadius: '8px',
      backgroundColor: 'white',
      margin: '5px',
    },
    '&::-webkit-scrollbar-track-piece': {
      width: '10px',
      height: '10px'
    },
    '&::-webkit-scrollbar-thumb': {
      WebkitBoxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
      borderRadius: '8px',
      width: '10px',
      height: '10px',
      backgroundColor: 'grey',
    },
    '&::-webkit-scrollbar-corner': {
      display: 'none'
    },
    '&::-webkit-resizer': {
      display: 'none'
    },
  },

});

@inject('store')
@observer
class Items extends Component {
  render() {
    const {classes} = this.props;
    const data = this.props.org_data;
    return (<div className={classes.root}>
      {data.map((item, i)=>{
        return <Item key={'item'+i} org_data={item}/>
      })}
    </div>);
  }
}

export default withStyles(styles)(Items);