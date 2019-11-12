import {ITrace, IPoint, IWorkspace} from '~/models/interfaces';
import {Moment} from 'moment';

export interface ITraceApi {
  all: () => Promise<ITrace[]>;
}

export interface IWorkspaceApi {
  all: () => Promise<IWorkspace[]>;
  delete: (id:string) => Promise<void>;
}

export interface IPointApi {
  rangeBy: (traceId: string, fromDate: Moment, toDate: Moment) => Promise<IPoint[]>;
}
