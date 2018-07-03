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
  state = {
    data: null,
  };
  componentWillMount() {
    const item_id = this.props.match.params.id;
    this.props.store.getItemInfo(item_id)
      .then(json => {
        console.log(json);
        this.setState({data: json});
      })
  }
  render() {
    const {classes, store} = this.props;
    const {location, push, goBack} = store.routing;
    const item_id = this.props.match.params.id;
    if(item_id === undefined || item_id === '' || this.state.data === null) return (<div/>);

    return (<div className={classes.root}>
      <Header org_data={this.state.data}/>
      <MainInfo org_data={this.state.data}/>
      <Details org_data={this.state.data}/>
    </div>);
  }
}

export default withStyles(styles)(ItemPage);