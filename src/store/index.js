import {observable, action} from 'mobx';
class Store {
  @observable hello = "hello";
  @action updateHello(hello) {
    this.hello = hello;
  }
}

const STORE = new Store();

export default STORE;