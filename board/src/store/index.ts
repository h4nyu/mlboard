import LoadingStore from './LoadingStore';
import AppStore from './AppStore';
import {
  ILoadingStore,
  IRoot,
  IAppStore,
} from './interfaces';


export class RootStore {
  loadingStore: ILoadingStore;
  appStore: IAppStore;

  constructor() {
    this.loadingStore = new LoadingStore();
    this.appStore = new AppStore(this);
  }
}

const store: IRoot = new RootStore();

export const loadingStore = store.loadingStore;
export const appStore = store.appStore;
export default store;
