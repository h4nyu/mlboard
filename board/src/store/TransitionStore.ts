import { observable, action, } from 'mobx';
import { IRoot } from './interfaces';
import { ITransition } from '~/models/interfaces'; 
import moment from 'moment';
import uuid from 'uuid';

export default class TransitionStore{
  @observable rows: Map<string, ITransition> = new Map();

  private root: IRoot
  constructor(root: IRoot){
    this.root = root;
  }

  @action add = (traceId: string) => {
    const row = {
      id: uuid(),
      traceId: traceId,
      isLog: false,
      isScatter:false,
      fromDate: moment().add(-1, 'hours'),
      toDate: moment(),
    };
    this.rows.set(row.id, row);
    this.root.pointStore.fetch(traceId);
  }
}
