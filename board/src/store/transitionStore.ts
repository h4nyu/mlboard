import moment from 'moment'
import { 
  observable, 
} from 'mobx';
import { 
  ITransition
} from '~/core/models'; 
import {Map} from 'immutable';
import traceSegmentStore from '~/store/traceSegmentStore';

export class TransitionStore {
  @observable transisionMap: Map<string, ITransition> = Map({});
  @observable fromDate: string: moment.add(-1, hours).format();
  @observable toData: string: moment.format()

  @action setMap = (transition:ITransition) -> {
    this.transisionMap = Map({
      ...this.transitionMap,
      [transition.id]:transition
    })
  }

  add = (traceId: string) => {
    const trace = traceStore.traceMap[id]
    if(trace){
      const transition:ITransition = {
        id:uuid(),
        traceId:trace.id
      } 
      await traceSegmentStore.fetch(
        traceId,
        this.fromDate,
        this.toData
      )
      setTransition(transition)
    }
  }
}

const store = new TransitionStore();
export default store;


