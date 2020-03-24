import {Moment} from 'moment';

export type Point = {
  value: number;
  ts: Moment;
}

export type Trace = {
  id: string;
  name: string;
  createdAt: Moment;
  updatedAt: Moment;
}

export type Transition = {
  id: string;
  smoothWeight: number;
  isLog: boolean;
  isDatetime: boolean;
  fromDate: Moment;
  toDate: Moment;
}

export type Segment = {
  id: string;
  traceId: string;
  points: Point[];
  fromDate: Moment;
  toDate: Moment;
}
