import {Moment} from 'moment';

export interface IPoint {
  value: number;
  ts: Moment;
}

export interface IWorkspace {
  id: string;
  name: string;
  params: {[key: string]: any};
  createdAt: Moment;
}

export interface ITrace {
  id: string;
  name: string;
  workspaceId: string;
  createdAt: Moment;
  updatedAt: Moment;
}

export interface ITransition {
  id: string;
  smoothWeight: number;
  isLog: boolean;
  isDatetime: boolean;
  fromDate: Moment;
  toDate: Moment;
}

export interface ISegment {
  id: string;
  traceId: string;
  points: IPoint[];
  fromDate: Moment;
  toDate: Moment;
}
