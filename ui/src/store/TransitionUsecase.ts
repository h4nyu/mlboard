import moment,{Moment} from 'moment';
import { action, observable, computed } from 'mobx';
import {Transition } from '~/models';
import {some, keyBy} from 'lodash';
import {v4 as uuid} from 'uuid';
import {RootStore} from './index';

import { Set } from "immutable";

export default class TransitionUsecase{
  private root: RootStore

  constructor(
    root: RootStore,
  ){
    this.root = root;
  }

  fetchAll = () => {
    this.fetchTraces();
    this.root.transitionStore.rows.forEach(x => {
      this.updateRange(x.id, x.fromDate, x.toDate);
    });
  }

  fetchTraces = async () => {
    await this.root.loadingStore.dispatch(async () => {
      const rows = await this.root.api.traceApi.all();
      if(rows === undefined) {return;}
      this.root.traceStore.upsert(keyBy(rows, x => x.id));
    });
  }

  @action addTrace = async (traceId: string) => {
    const transition = {
      id: uuid(),
      traceId: traceId,
      smoothWeight: 0.0,
      isLog: false,
      isDatetime:true,
      fromDate: moment().add(-1, "months"),
      toDate: moment(),
      points: [],
    };
    this.root.transitionStore.upsert({[transition.id]: transition});
    await this.updateRange(transition.id, transition.fromDate, transition.toDate);
  }

  @action updateSmoothWeight = (id: string, value: number) => {
    const transition = this.root.transitionStore.rows.get(id);
    if(transition === undefined){return;}
    this.root.transitionStore.upsert({ [id]: { ...transition, smoothWeight:value, }});
  }

  @action updateRange = async (transitionId: string, fromDate: Moment, toDate: Moment) => {
    const transition = this.root.transitionStore.rows.get(transitionId);
    if(transition === undefined){return;}
    await this.root.loadingStore.dispatch(async () => {
      const points = await this.root.api.pointApi.rangeBy(transition.traceId, fromDate, toDate);
      if(points === undefined) {return;};
      this.root.transitionStore.upsert({[transitionId]: { ...transition, fromDate, toDate, points:points}});
    });
  }

  @action toggleIsDatetime = (id: string) => {
    const row = this.root.transitionStore.rows.get(id);
    if(row){
      this.root.transitionStore.upsert({ [id]: { ...row, isDatetime:!row.isDatetime, }});
    }
  }

  @action toggleIsLog = (id: string) => {
    const row = this.root.transitionStore.rows.get(id);
    if(row){
      this.root.transitionStore.upsert({[id]:{
        ...row,
        isLog:!row.isLog,
      }});
    }
  }

  @action deleteTransition = (id: string) => {
    this.root.transitionStore.delete([id]);
  }
}

