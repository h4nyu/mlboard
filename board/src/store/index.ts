import { ITrace, IPoint, ITransition, IWorkspace } from '~/models/interfaces';
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
import WorkspaceApi from '~/api/WorkspaceApi';

export class RootStore {
  loadingStore: ILoadingStore;
  appStore: IAppStore;
  traceStore: IModelStore<ITrace>;
  segmentStore: IModelStore<IPoint[]>;
  transitionStore: IModelStore<ITransition>;
  workspaceStore: IModelStore<IWorkspace>;
  transitionUsecase: ITransitionUsecase;

  constructor() {
    const traceApi = new TraceApi();
    const pointApi = new PointApi();
    const workspaceApi = new WorkspaceApi();

    this.segmentStore = new ModelStore<IPoint[]>();
    this.traceStore = new ModelStore<ITrace>();
    this.transitionStore = new ModelStore<ITransition>();
    this.workspaceStore = new ModelStore<IWorkspace>();
    this.loadingStore = new LoadingStore();
    this.appStore = new AppStore(this);
    this.transitionUsecase = new TransitionUsecase(
      this,
      pointApi,
      traceApi,
      workspaceApi,
    );
  }
}

const store: IRoot = new RootStore();
export default store;
