import {Moment} from 'moment';

export interface Point {
  value: number;
  ts: Moment;
}

export interface Trace {
  id: string;
  name: string;
  createdAt: Moment;
  updatedAt: Moment;
}

export interface Transition {
  id: string;
  traceId: string;
  smoothWeight: number;
  isLog: boolean;
  isSync: boolean;
  isDatetime: boolean;
  segmentIds: string[];
  fromDate: Moment;
  toDate: Moment;
}

export interface Segment {
  id: string;
  traceId: string;
  points: Point[];
  fromDate: Moment;
  toDate: Moment;
}
