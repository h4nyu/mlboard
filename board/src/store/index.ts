import LoadingStore from './LoadingStore';
import AppStore from './AppStore';
import TraceStore from './TraceStore';
import SegmentStore from './SegmentStore';
import TransitionStore from './TransitionStore';
import {
  ILoadingStore,
  ITraceStore,
  ISegmentStore,
  ITransitionStore,
  IRoot,
  IAppStore,
} from './interfaces';
import { Map } from 'immutable';
import TraceApi from '~/api/TraceApi';
import PointApi from '~/api/PointApi';


export class RootStore {
  loadingStore: ILoadingStore;
  appStore: IAppStore;
  traceStore: ITraceStore;
  segmentStore: ISegmentStore;
  transitionStore: ITransitionStore;

  constructor() {
    const traceApi = new TraceApi();
    const pointApi = new PointApi();
    this.segmentStore = new SegmentStore(
      this,
      pointApi,
    );
    this.loadingStore = new LoadingStore();
    this.traceStore = new TraceStore(
      this, 
      traceApi
    );
    this.appStore = new AppStore(this);
    this.transitionStore = new TransitionStore(this);
  }
}

const store: IRoot = new RootStore();

export const loadingStore = store.loadingStore;
export const appStore = store.appStore;
export const traceStore = store.traceStore;
export const transitionStore = store.transitionStore;
export const segmentStore = store.segmentStore;
export default store;
