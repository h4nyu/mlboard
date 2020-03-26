import {RootStore } from './index';

export default class AppStore {
  private root: RootStore;
  constructor(
    root: RootStore,
  ){
    this.root = root;
  }
  init = () => {
    this.root.transitionUsecase.fetchAll();
  }

  reflesh = () => {
    this.root.transitionUsecase.fetchAll();
  }
}
