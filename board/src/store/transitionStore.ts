import moment from 'moment';
import uuid from 'uuid';
import { 
  observable, 
  action
} from 'mobx';
import { 
  ITransition
} from '~/core/models'; 
import {Map} from 'immutable';
import traceStore from '~/store/traceStore';
import traceSegmentStore from '~/store/traceSegmentStore';

export class TransitionStore {
  @observable transitionMap: Map<string, ITransition> = Map({});
  @observable fromDate: string = moment().add(-1, 'hours').format();
  @observable toData: string = moment().format()

  @action setTransition = (transition: ITransition) => {
    this.transitionMap = Map({
      ...this.transitionMap,
      [transition.id]:transition
    });
  }

  add = async (traceId: string) => {
    const trace = traceStore.traceMap.get(traceId);
    if(trace){
      const transition: ITransition = {
        id:uuid(),
        traceId:trace.id
      }; 
      await traceSegmentStore.fetch(
        traceId,
      );
      this.setTransition(transition);
    }
  }
}

const store = new TransitionStore();
export default store;


