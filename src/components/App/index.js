import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import NavigationBarOnTop from '../NavigationBarOnTop'

@inject('store')
@observer
export default class App extends Component {
  render() {
    return (
      <main>
        <NavigationBarOnTop/>
      </main>
    );
  }
}