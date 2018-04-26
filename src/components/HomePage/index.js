import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles } from 'material-ui/styles';
import HeadColumn from './HeadColumn';
import ItemsColumn from './ItemsColumn';

const styles = theme => ({

});

@inject('store')
@observer
class HomePage extends Component {
  render() {
    const {classes, store} = this.props;

    return (
      <div>
        <HeadColumn />
        {
          store.itemsColumnsOnHomePage.map((column, i) => {
            return (<ItemsColumn data={column} key={`itemsColumnOnHomePage_${i}`}/>);
          })
        }
      </div>
    );
  }
}

export default withStyles(styles)(HomePage);