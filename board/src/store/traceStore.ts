import { 
  observable, 
  action,
} from 'mobx';
import { 
  ITrace 
} from '~/core/models'; 
import {Map} from 'immutable';
import uuid from 'uuid';
import moment from 'moment';
import * as traceApi from '~/core/api/trace';

export class TraceStore{
  @observable traceMap: Map<string, ITrace> = Map({})
  @observable traceIds: string[] = []
  @observable keyward: string = ""
  @observable fromDate: string = moment().add(-1, 'hours').format()
  @observable toDate: string = moment().format()


  @action setTrace = (trace: ITrace) => {
    this.traceMap.set(trace.id, trace);
  }

  @action deleteTrace =  (traceId: string) => {
    this.traceMap.delete(traceId);
  }

  @action setTraceIds = (rows: string[]) => {
    this.traceIds = rows;
  }

  select =  async (traceId: string) => {
    const points = await traceApi.rangeBy(traceId, this.fromDate, this.toDate);
    if(points){
      const trace: ITrace = {
        id: uuid(),
        configId: traceId,
        fromDate: this.fromDate,
        toDate: this.toDate,
        points: points
      };
      this.setTrace(trace);
    }
  }

  fetchTraceIds = async () => {
    const rows = await traceApi.searchBy(this.keyward);
    this.setTraceIds(rows);
  }

}

const store = new TraceStore();
export default store;
