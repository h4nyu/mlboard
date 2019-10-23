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

export interface ISegment {
  id: string;
  traceId: string;
  fromDate: Moment;
  toDate: Moment;
}
