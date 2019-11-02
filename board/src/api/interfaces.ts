import {ITrace, IPoint} from '~/models/interfaces';
import {Moment} from 'moment';

export interface ITraceApi {
  all: () => Promise<ITrace[]>;
}

export interface IPointApi {
  rangeBy: (traceId: string, fromDate: Moment, toDate: Moment) => Promise<IPoint[]>;
  rangeByLimit: (traceId: string, limit: number) => Promise<IPoint[]>;
}
