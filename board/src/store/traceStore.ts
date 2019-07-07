import { 
  observable, 
  action,
} from 'mobx';
import { 
  ITrace 
} from '~/core/models'; 
import {Map} from 'immutable';

export class TraceStore {
  @observable traceSet: Map<string, ITrace> = Map({});

  @action setTraceSet = (traces: ITrace[]) => {
    traces.forEach(x => this.traceSet.set(x.id, x));
  }
}

const store = new TraceStore();
export default store;

