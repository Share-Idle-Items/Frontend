import {observable, action} from 'mobx';
class Store {
  @observable HOMEPAGE = 0;
  @observable PUBLISHPAGE = 1;
  @observable USERPAGE = 2;

  @observable AppName = "共享闲置";
  @observable hasSignedIn = false;
  @observable pageCode = this.HOMEPAGE;
}

const STORE = new Store();

export default STORE;