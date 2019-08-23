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
  @observable traceIds: string[] = []
  @observable fromDate: string = moment().add(-1, 'hours').format()
  @observable toData: string = moment().format()
  @observable traceMap: Map<string, ITrace> = Map({})


  @action setTrace = (ITrace) => {
    this.traceMap.set(x.id, x);
  }

  @action deleteTrace =  (traceId: string) => {
    this.traceMap.delete(traceId)
  }

  @action setTraceIds = (rows: string[]) => {
    this.traceIds = rows
  }

  select =  async (traceId: string) => {
    const points = await traceApi.getPoints(traceId, this.fromDate, this.toData);
    if(points){
      const trace:ITrace = {
        id: uuid(),
        configId: traceId,
        fromDate: this.fromDate,
        toData: this.toData,
        points: points
      }
      this.setTrace(trace)
    }
  }

  fetchTraceIds = async () => {
    const rows = await traceApi.getTraceIds();
    this.setTraceIds(rows);
  }

}

const store = new TraceStore();
export default store;
