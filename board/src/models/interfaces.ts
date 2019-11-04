import {Moment} from 'moment';

export interface IPoint {
  value: number;
  ts: Moment;
}

export interface IWorkspace {
  id: string;
  name: string;
  params: object;
  createdAt: Moment;
}

export interface ITrace {
  id: string;
  tag: string;
  createdAt: Moment;
  updatedAt: Moment;
}

export interface ITransition {
  id: string;
  traceId: string;
  smoothWeight: number;
  isScatter: boolean;
  isLog: boolean;
  isDatetime: boolean;
  fromDate: Moment;
  toDate: Moment;
}
