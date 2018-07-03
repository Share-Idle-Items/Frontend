import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import HeadColumn from './HeadColumn';
import ItemsColumn from './ItemsColumn';

const styles = theme => ({
  root: {
    minHeight: innerHeight - 190,
    paddingTop: '80px',
    paddingBottom: '80px',
  }
});

@inject('store')
@observer
class HomePage extends Component {
  state = {
    data: null,
  };

  componentWillMount() {
    this.props.store.getHomePageInfo()
      .then(data=>{
        this.setState({data});
        console.log(data);
      });
  }
  render() {
    const {classes, store} = this.props;
    if(this.state.data === null) return(<div>Loading</div>);
    return (
      <div className={classes.root}>
        <HeadColumn org_data={this.state.data}/>
        {
          this.state.data.itemsColumns.map((column, i) => {
            return (<ItemsColumn org_data={column} key={`itemsColumnOnHomePage_${i}`}/>);
          })
        }
      </div>
    );
  }
}

export default withStyles(styles)(HomePage);