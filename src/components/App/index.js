import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import Button from 'material-ui/Button';

@inject('store')
@observer
export default class App extends Component {
  counter = 0;
  handleClick = () => {
    this.props.store.updateHello(++this.counter);
  };
  
  render() {
    return (
      <main>
        <Button variant="raised" onClick={this.handleClick}>
          Sad
        </Button>
        {this.props.store.hello}
      </main>
    );
  }
}