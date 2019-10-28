import { ITrace, IPoint, ITransition } from '~/models/interfaces';
import {Moment} from 'moment';

export interface IAppStore {
  init: () => void;
}

export interface ISegmentStore {
  points: Map<string, IPoint[]>; 
  fetch: (traceId: string) => void;
}


export interface ILoadingStore {
  pendingNum: number;
  activate: () => void;
  deactivate: () => void;
  dispatch: <T>(collback: () => T) => Promise<T| undefined>;
}

export interface ITransitionStore {
  rows: Map<string, ITransition>; 
  add: (traceId: string) => void;
}

export interface ITraceStore {
  traces: Map<string, ITrace>; 
  traceIds: string[]; 
  keyward: string;
  fromDate: Moment; 
  toDate: Moment;
  fetch: () => void;
}

export interface IRoot {
  loadingStore: ILoadingStore;
  traceStore: ITraceStore;
  segmentStore: ISegmentStore;
  transitionStore: ITransitionStore;
  appStore: IAppStore;
}
