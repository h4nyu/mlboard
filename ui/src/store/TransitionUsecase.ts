import moment,{Moment} from 'moment';
import { action, observable, computed } from 'mobx';
import {Transition, Segment } from '~/models';
import {some, keyBy} from 'lodash';
import {v4 as uuid} from 'uuid';
import {RootStore} from './index';

import { Set } from "immutable";

export default class TransitionUsecase{
  private root: RootStore
  @observable selectedId: string = "";

  constructor(
    root: RootStore,
  ){
    this.root = root;
    if(this.root.transitionStore.rows.size === 0){
      this.addTransition()
    }
  }

  fetchAll = () => {
    this.fetchTraces();
    this.root.transitionStore.rows.forEach(x => {
      this.updateRangeOne(x, x.fromDate, x.toDate);
    });
  }

  fetchTraces = async () => {
    await this.root.loadingStore.dispatch(async () => {
      const rows = await this.root.api.traceApi.all();
      if(rows === undefined) {return;}
      this.root.traceStore.upsert(keyBy(rows, x => x.id));
    });
  }

  @action addTransition = async () => {
    const transition = {
      id: uuid(),
      traceId:uuid(),  
      smoothWeight: 0.0,
      isLog: false,
      isSync: true,
      isDatetime:true,
      fromDate: moment().add(-1, "months"),
      toDate: moment(),
      points: [],
      segmentIds: [],
    };
    this.root.transitionStore.upsert({[transition.id]: transition});
    this.selectedId = transition.id;
  }

  fetchSegment = async (segment:Segment) => {
    await this.root.loadingStore.dispatch(async () => {
      const points = await this.root.api.pointApi.rangeBy(segment.traceId, segment.fromDate, segment.toDate);
      if(points === undefined) {return;};
      this.root.segmentStore.upsert({[segment.id]: { ...segment, points:points}});
    });
  }

  @action addTrace = async (traceId: string) => {
    const transition = this.root.transitionStore.rows.get(this.selectedId);
    if (transition === undefined) return;

    const segment = {
      id:uuid(),
      traceId: traceId,
      points: [],
      fromDate: transition.fromDate,
      toDate: transition.toDate,
    }
    this.root.transitionStore.upsert({[transition.id]: {...transition, segmentIds: [...transition.segmentIds, segment.id]}});
    this.fetchSegment(segment)
  }

  @action updateSmoothWeight = (id: string, value: number) => {
    const transition = this.root.transitionStore.rows.get(id);
    if(transition === undefined){return;}
    this.root.transitionStore.upsert({ [id]: { ...transition, smoothWeight:value, }});
  }

  @action updateRangeOne = async (transition: Transition, fromDate: Moment, toDate: Moment) => {
    const segments = this.root.segmentStore.rows.filter(x => transition.segmentIds.includes(x.id))
      .forEach(x => {
        this.fetchSegment({ ...x, fromDate, toDate, })
      })
      this.root.transitionStore.upsert({[transition.id]: { ...transition, fromDate, toDate}});
  }

  @action syncRange = async (transitionId: string, fromDate: Moment, toDate: Moment) => {
    const transition = this.root.transitionStore.rows.get(transitionId);
    if(transition === undefined){return;}
    if (!transition.isSync) {
      await this.updateRangeOne(transition, fromDate, toDate)
    }else {
      this.root.transitionStore.rows.filter(x => x.isSync).forEach(x => {
        this.updateRangeOne(x, fromDate, toDate);
      });
    }
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

  @action toggleIsSync = (id: string) => {
    const row = this.root.transitionStore.rows.get(id);
    if(row){
      this.root.transitionStore.upsert({[id]:{
        ...row,
        isSync:!row.isSync,
      }});
    }
  }

  @action deleteTransition = (id: string) => {
    const transition = this.root.transitionStore.rows.get(id);
    if(transition === undefined){return;}
    this.root.segmentStore.delete(transition.segmentIds);
    this.root.transitionStore.delete([id]);
  }

  @action select = (id: string) => {
    this.selectedId = id;
  }
}

