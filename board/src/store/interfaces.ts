import { ITrace, IPoint } from '~/models/interfaces';
import {Moment} from 'moment';

export interface IAppStore {
  init: () => void;
}

export interface IPointStore {
  points: Map<string, IPoint[]>; 
  fetch: (traceId: string) => void;
}


export interface ILoadingStore {
  pendingNum: number;
  activate: () => void;
  deactivate: () => void;
  dispatch: <T>(collback: () => T) => Promise<T| undefined>;
}

export interface ITraceStore {
  traces: Map<string, ITrace>; 
  traceIds: string[]; 
  keyward: string;
  select: (traceId: string) => void;
  fromDate: Moment; 
  toDate: Moment;
  fetch: () => void;
}

export interface IRoot {
  loadingStore: ILoadingStore;
  traceStore: ITraceStore;
  pointStore: IPointStore;
  appStore: IAppStore;
}
