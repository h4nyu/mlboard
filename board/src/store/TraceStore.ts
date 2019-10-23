import { observable, action, } from 'mobx';
import { Moment } from 'moment';
import moment from 'moment';
import { ITraceApi } from '~/api/interfaces';
import { IRoot } from './interfaces';
import { ITrace } from '~/models/interfaces'; 

export default class TraceStore{
  @observable traces: Map<string, ITrace> = new Map();
  @observable traceIds: string[] = [];
  @observable keyward: string = ""
  @observable fromDate: Moment = moment().add(-1, 'hours')
  @observable toDate: Moment = moment()

  private traceApi: ITraceApi
  private root: IRoot

  constructor(
    root: IRoot,
    traceApi: ITraceApi,
  ){
    this.root = root;
    this.traceApi = traceApi;
  }


  @action setTraces = (traces: ITrace[]) => {
    this.traces = new Map(
      traces.map(x => [x.id, x])
    );
  }

  @action deleteTrace =  (traceId: string) => {
    this.traces.delete(traceId);
  }

  @action setTraceIds = (rows: string[]) => {
    this.traceIds = rows;
  }

  @action select =  (traceId: string) => {
    this.root.pointStore.fetch(traceId);
  }

  fetch = async () => {
    const rows = await this.traceApi.all();
    this.setTraces(rows);
  }
}
