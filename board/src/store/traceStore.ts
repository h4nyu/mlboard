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
  @observable selectedIds: string[] = []

  @action setMap = (rows: ITrace[]) => {
    rows.map(x => this.traceMap.set(x.id, x));
  }

  @action select = (traceId: string) => {
    if(this.selectedIds.includes(traceId)){
      this.selectedIds = this.selectedIds.filter(x => x !== traceId);
    }else{
      this.selectedIds = [...this.selectedIds, traceId];
    }
  }

  fetch = async () => {
    const rows = await traceApi.all();
    this.setMap(rows);
  }
}

const store = new TraceStore();
export default store;

