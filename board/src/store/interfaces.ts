import { ITrace, IPoint, ITransition } from '~/models/interfaces';
import { Map } from 'immutable';

export interface IModelStore<T> {
  rows: Map<string, T>;
  upsert: (key: string, value: T) => void;
  delete: (key: string) => void;
}

export interface IAppStore {
  init: () => void;
}

export interface ILoadingStore {
  pendingNum: number;
  activate: () => void;
  deactivate: () => void;
  dispatch: <T>(collback: () => T) => Promise<T| undefined>;
}

export interface ITransitionUsecase {
  fetchTraces: () => void;
  add: (traceId: string) => void;
  delete: (id: string) => void;
  toggleIsLog: (id: string) => void;
  toggleIsDatetime: (id: string) => void;
  toggleIsScatter: (id: string) => void;
}

export interface IRoot {
  // application
  loadingStore: ILoadingStore;
  appStore: IAppStore;

  // domain
  traceStore: IModelStore<ITrace>;
  segmentStore: IModelStore<IPoint[]>;
  transitionStore: IModelStore<ITransition>;

  // usecase
  transitionUsecase: ITransitionUsecase;
}
