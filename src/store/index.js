import {observable, action} from 'mobx';
class Store {
  @observable AppName = "共享闲置";
  @observable hasSignedIn = false;
}

const STORE = new Store();

export default STORE;