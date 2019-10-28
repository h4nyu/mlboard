import { ITrace, IPoint, ITransition } from '~/models/interfaces';
import {Moment} from 'moment';
import { Map } from 'immutable';

export interface IAppStore {
  init: () => void;
}

export interface ISegmentStore {
  segments: Map<string, IPoint[]>; 
  deleteById: (id: string) => void;
  fetch: (traceId: string, fromDate: Moment, toDate: Moment) => void;
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
  deleteById: (id: string) => void;
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
