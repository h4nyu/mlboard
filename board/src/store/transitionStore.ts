import { 
  observable, 
  action,
} from 'mobx';
import { 
  ITransition
} from '~/core/models'; 
import {Map} from 'immutable';

export class TransitionStore {
  @observable transisionSet: Map<string, ITransition> = Map({});
}

const store = new TransitionStore();
export default store;


