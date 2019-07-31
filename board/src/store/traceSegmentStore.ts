import { 
  observable, 
} from 'mobx';
import { 
  ITraceSegment
} from '~/core/models'; 
import {Map} from 'immutable';

export class TraceSegmentStore{
  @observable traceSegmentMap: Map<string,ITraceSegment> = Map({});
  fetch = async(traceId: string) => {
    return traceId;
  }
}

const store = new TraceSegmentStore();
export default store;
