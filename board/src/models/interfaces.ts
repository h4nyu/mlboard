import {Moment} from 'moment';

export interface IPoint {
  value: number;
  ts: Moment;
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
  isScatter: boolean;
  isLog: boolean;
  fromDate: Moment;
  toDate: Moment;
}
