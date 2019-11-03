import { ITrace, IPoint, ITransition } from '~/models/interfaces';
import LoadingStore from './LoadingStore';
import AppStore from './AppStore';
import ModelStore from './ModelStore';
import TransitionUsecase from './TransitionUsecase';
import {
  IRoot,
  IAppStore,
  ILoadingStore,
  IModelStore,
  ITransitionUsecase,
} from './interfaces';

import TraceApi from '~/api/TraceApi';
import PointApi from '~/api/PointApi';

export class RootStore {
  loadingStore: ILoadingStore;
  appStore: IAppStore;
  traceStore: IModelStore<ITrace>;
  segmentStore: IModelStore<IPoint[]>;
  transitionStore: IModelStore<ITransition>;
  transitionUsecase: ITransitionUsecase;

  constructor() {
    const traceApi = new TraceApi();
    const pointApi = new PointApi();

    this.segmentStore = new ModelStore<IPoint[]>();
    this.traceStore = new ModelStore<ITrace>();
    this.transitionStore = new ModelStore<ITransition>();
    this.loadingStore = new LoadingStore();
    this.appStore = new AppStore(this);
    this.transitionUsecase = new TransitionUsecase(
      this,
      pointApi,
      traceApi,
    );
  }
}

const store: IRoot = new RootStore();
export default store;
