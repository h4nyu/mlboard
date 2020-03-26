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
  traceId: string;
  smoothWeight: number;
  isLog: boolean;
  isDatetime: boolean;
  points: Point[];
  fromDate: Moment;
  toDate: Moment;
}
