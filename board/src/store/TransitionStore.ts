import { observable, action, } from 'mobx';
import { IRoot } from './interfaces';
import { ITransition } from '~/models/interfaces'; 
import { Map } from 'immutable';
import moment from 'moment';
import uuid from 'uuid';

export default class TransitionStore{
  @observable rows: Map<string, ITransition> = Map();

  private root: IRoot
  constructor(root: IRoot){
    this.root = root;
  }

  @action deleteById = (id: string) => {
    this.root.segmentStore.deleteById(id);
    this.rows = this.rows.delete(id);
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
    this.rows = this.rows.set(row.id, row);
    this.root.segmentStore.fetch(
      traceId,
      row.fromDate,
      row.toDate,
    );
  }
}
