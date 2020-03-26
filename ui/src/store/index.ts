import { 
  Trace, 
  Transition, 
} from '~/models';
import LoadingStore from './LoadingStore';
import AppStore from './AppStore';
import ModelStore from './ModelStore';
import TransitionUsecase from './TransitionUsecase';
import SearchUsecase from './SearchUsecase';

import WebApi from '~/api';

export class RootStore {
  api: WebApi
  loadingStore: LoadingStore;
  appStore: AppStore;
  traceStore: ModelStore<Trace>;
  transitionStore: ModelStore<Transition>;
  transitionUsecase: TransitionUsecase;
  searchUsecase : SearchUsecase;

  constructor() {
    this.api = new WebApi()

    this.traceStore = new ModelStore<Trace>();
    this.transitionStore = new ModelStore<Transition>();
    this.loadingStore = new LoadingStore();
    this.appStore = new AppStore(this);
    this.transitionUsecase = new TransitionUsecase(this);
    this.searchUsecase = new SearchUsecase(this);
  }
}

const store = new RootStore();
export default store;
