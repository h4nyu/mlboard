import {Moment} from 'moment';
import { ITrace, IPoint, ITransition, IWorkspace, ISegment } from '~/models/interfaces';
import { Map,Set } from 'immutable';

export interface IModelStore<T> {
  rows: Map<string, T>;
  upsert: (key: string, value: T) => void;
  delete: (key: string) => void;
}

export interface IAppStore {
  init: () => void;
  reflesh: () => void;
}

export interface ILoadingStore {
  pendingNum: number;
  activate: () => void;
  deactivate: () => void;
  dispatch: (collback: () => Promise<void>) => Promise<void>;
}

export interface ITransitionUsecase {
  traceKeyword: string;
  traces: Map<string, ITrace>;
  relations: Set<[string, string, string]>;
  workspaces: Map<string, IWorkspace>;
  currentId: string;

  fetchAll: () => void;
  add: () => void;
  addTrace: (traceId: string) => void;
  select: (transitionId: string) => void;
  deleteTransition: (id: string) => void;
  deleteWorkspace: (workspaceId: string) => void;
  setTraceKeyword: (keyword: string) => void;
  updateRange: (id: string,fromDate: Moment, toDate: Moment) => void;
  updateSmoothWeight: (id: string, value: number) => void;
  toggleIsLog: (id: string) => void;
  toggleIsDatetime: (id: string) => void;
}

export interface IRoot {
  // application
  loadingStore: ILoadingStore;
  appStore: IAppStore;

  // domain
  traceStore: IModelStore<ITrace>;
  segmentStore: IModelStore<ISegment>;
  transitionStore: IModelStore<ITransition>;
  workspaceStore: IModelStore<IWorkspace>;

  // usecase
  transitionUsecase: ITransitionUsecase;
}
