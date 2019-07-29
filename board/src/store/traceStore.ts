import { 
  observable, 
  action,
} from 'mobx';
import { 
  ITrace 
} from '~/core/models'; 
import {Map} from 'immutable';
import * as traceApi from '~/core/api/trace';

export class TraceStore{
  @observable traceMap: Map<string, ITrace> = Map({})

  @action setMap = (rows: ITrace[]) => {
    rows.map(x => this.traceMap.set(x.id, x));
  }

  fetch = async () => {
    const rows = await traceApi.all();
    return rows;
  }
}

const store = new TraceStore();
export default store;

