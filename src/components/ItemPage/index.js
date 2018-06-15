import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import Header from './Header';
import MainInfo from './MainInfo';
import Details from './Details';

const styles = theme => ({
  root: {
    minHeight: innerHeight - 190,
    paddingTop: 80,
    paddingBottom: 80,
    width: innerWidth * 0.8,
    marginLeft: innerWidth * 0.1,
  }
});

@inject('store')
@observer
class ItemPage extends Component {
  render() {
    const {classes, store} = this.props;
    const {location, push, goBack} = store.routing;
    const item_id = this.props.match.params.id;
    if(item_id === undefined || item_id === '') return(<div/>);
    const data = store.getItemInfo(item_id);

    return (<div className={classes.root}>
      <Header org_data={data}/>
      <MainInfo org_data={data}/>
      <Details org_data={data}/>
    </div>);
  }
}

export default withStyles(styles)(ItemPage);