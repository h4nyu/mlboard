import LoadingStore from './LoadingStore';
import AppStore from './AppStore';
import TraceStore from './TraceStore';
import PointStore from './PointStore';
import {
  ILoadingStore,
  ITraceStore,
  IPointStore,
  IRoot,
  IAppStore,
} from './interfaces';
import TraceApi from '~/api/TraceApi';
import PointApi from '~/api/PointApi';


export class RootStore {
  loadingStore: ILoadingStore;
  appStore: IAppStore;
  traceStore: ITraceStore;
  pointStore: IPointStore;

  constructor() {
    const traceApi = new TraceApi();
    const pointApi = new PointApi();
    this.pointStore = new PointStore(
      this,
      pointApi,
    );
    this.loadingStore = new LoadingStore();
    this.traceStore = new TraceStore(
      this, 
      traceApi
    );
    this.appStore = new AppStore(this);
  }
}

const store: IRoot = new RootStore();

export const loadingStore = store.loadingStore;
export const appStore = store.appStore;
export const traceStore = store.traceStore;
export default store;
