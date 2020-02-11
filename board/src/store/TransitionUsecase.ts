import moment,{Moment} from 'moment';
import { action, observable, computed } from 'mobx';
import { IPointApi, ITraceApi, IWorkspaceApi } from '~/api/interfaces';
import { IRoot } from './interfaces';
import { ISegment } from '~/models/interfaces'; 
import {some, keyBy} from 'lodash';
import uuid from 'uuid';

import { Set } from "immutable";

export default class TransitionUsecase{
  private pointApi: IPointApi
  private traceApi: ITraceApi
  private workspaceApi: IWorkspaceApi;
  private root: IRoot
  @observable traceKeyword: string = "";
  @observable currentId: string = "";
  @observable relations: Set<[string, string, string]> = Set();

  constructor(
    root: IRoot,
    pointApi: IPointApi,
    traceApi: ITraceApi,
    workspaceApi: IWorkspaceApi,
  ){
    this.root = root;
    this.pointApi = pointApi;
    this.traceApi = traceApi;
    this.workspaceApi = workspaceApi;
  }

  @computed get workspaces() { const keywords = this.traceKeyword.split(',').map(x => x.trim());
    const workspaces = this.root.workspaceStore.rows.sortBy(x => - x.createdAt);
    if(this.traceKeyword.length === 0){
      return workspaces;
    }

    return workspaces.filter(x => {
      const target = `
        ${x.name}
      `;
      const res = some(keywords.map(y => target.includes(y.trim())));
      return res;
    });
  }

  @computed get traces() {
    const keywords = this.traceKeyword.split(',').map(x => x.trim());
    const traces =  this.root.traceStore.rows.sortBy(x => - x.updatedAt);
    if(this.traceKeyword.length === 0){
      return traces;
    }
    return traces.filter(x => {
      const target = `
        ${x.name}
      `;
      const res = some(keywords.map(y => target.includes(y.trim())));
      return res;
    });
  }

  fetchAll = () => {
    this.fetchTraces();
    this.fetchWorkspaces();
    this.root.transitionStore.rows.forEach(x => {
      this.updateRange(x.id, x.fromDate, x.toDate);
    });
  }

  fetchWorkspaces = async () => {
    await this.root.loadingStore.dispatch(async () => {
      const rows = await this.workspaceApi.all();
      if(rows === undefined) {return;}
      this.root.workspaceStore.upsert(keyBy(rows, x=> x.id));
    });
  }

  fetchTraces = async () => {
    await this.root.loadingStore.dispatch(async () => {
      const rows = await this.traceApi.all();
      if(rows === undefined) {return;}
      this.root.traceStore.upsert(keyBy(rows, x => x.id));
    });
  }

  @action select = (transitionId: string) => {
    this.currentId = transitionId;
  }

  @action addTrace = async (traceId: string) => {
    const transition = this.root.transitionStore.rows.get(this.currentId);
    if (transition === undefined){return;}
    const segmentCount = this.relations.filter(x => (x[0] === this.currentId && x[1] === traceId)).size;
    if (segmentCount > 0 ) {return;}

    await this.root.loadingStore.dispatch(async () => {
      const points = await this
        .pointApi
        .rangeBy(traceId, transition.fromDate, transition.toDate);
      if (points === undefined) return;
      const segment = {
        id: uuid(),
        traceId: traceId,
        points: points,
        fromDate: transition.fromDate,
        toDate: transition.toDate
      };
      this.root.segmentStore.upsert({[segment.id]: segment});
      this.relations = this.relations.add([this.currentId, traceId, segment.id]);
    });
  }

  @action add = async () => {
    const transition = {
      id: uuid(),
      traceId: uuid(),
      smoothWeight: 0.0,
      isLog: false,
      isDatetime:true,
      fromDate: moment().add(-1, "months"),
      toDate: moment(),
    };
    this.root.transitionStore.upsert({[transition.id]: transition});
    this.select(transition.id);
  }

  @action setTraceKeyword = (keyword: string) => {
    this.traceKeyword = keyword;
  }

  @action updateSmoothWeight = (id: string, value: number) => {
    const transition = this.root.transitionStore.rows.get(id);
    if(transition === undefined){return;}
    this.root.transitionStore.upsert({ [id]: { ...transition, smoothWeight:value, }});
  }

  @action updateRange = async (id: string, fromDate: Moment, toDate: Moment) => {
    const transition = this.root.transitionStore.rows.get(id);
    if(transition === undefined){return;}
    this.root.transitionStore.upsert({[id]: { ...transition, fromDate, toDate,}});

    const futs = this.relations
      .flatMap(rel => {
        return this.root.segmentStore.rows.filter(x => x.id === rel[2]).toList();
      })
      .map(async (x: ISegment) => {
        await this.root.loadingStore.dispatch(async () => {
          const res =await this.pointApi.rangeBy(x.traceId, fromDate, toDate);
          if(res === undefined) {return;};
          this.root.segmentStore.upsert({
            [x.id]: { ...x, fromDate, toDate, points:res}
          });
        });
      }).toJS();
    await Promise.all(futs);
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
    const segmentIds = this.relations.filter(x => x[0] === id).map(x => x[2]).toJS();
    this.root.segmentStore.delete(segmentIds);
    this.root.transitionStore.delete([id]);
    this.relations = this.relations.filter(x => x[0] !== id);
  }

  deleteWorkspace = async (id: string) => {
    await this.root.loadingStore.dispatch(async () => {
      await this.workspaceApi.delete(id);
      const traceIds = this.root.traceStore.rows.filter(x => x.workspaceId === id).map(x => x.id)
        .toList()
        .toJS();
      this.root.traceStore.delete(traceIds);
      this.root.workspaceStore.delete([id]);
    });
  }
}

