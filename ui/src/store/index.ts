import { 
  Trace, 
  Transition, 
  Segment,
} from '~/models';
import LoadingStore from './LoadingStore';
import AppStore from './AppStore';
import ModelStore from './ModelStore';
import TransitionUsecase from './TransitionUsecase';
import SearchUsecase from './SearchUsecase';
import TraceUsecase from './TraceUsecase';

import WebApi from '~/api';

export class RootStore {
  api: WebApi
  loadingStore: LoadingStore;
  appStore: AppStore;
  traceStore: ModelStore<Trace>;
  segmentStore: ModelStore<Segment>;
  transitionStore: ModelStore<Transition>;
  transitionUsecase: TransitionUsecase;
  traceUsecase: TraceUsecase;
  searchUsecase: SearchUsecase;

  constructor() {
    this.api = new WebApi();

    this.traceStore = new ModelStore<Trace>();
    this.segmentStore = new ModelStore<Segment>();
    this.transitionStore = new ModelStore<Transition>();
    this.loadingStore = new LoadingStore();
    this.appStore = new AppStore(this);
    this.transitionUsecase = new TransitionUsecase(this);
    this.traceUsecase = new TraceUsecase(this);
    this.searchUsecase = new SearchUsecase(this);
  }
}

const store = new RootStore();
export default store;
