import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';

@inject('store')
@observer
export default class App extends Component {
  render() {
    return (
      <main>
        {this.props.store.hello}
      </main>
    );
  }
}