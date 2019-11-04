import moment, {Moment} from 'moment';
import { action, observable, computed } from 'mobx';
import { IPointApi, ITraceApi, IWorkspaceApi } from '~/api/interfaces';
import { IRoot } from './interfaces';
import { IPoint } from '~/models/interfaces'; 
import _ from 'lodash';

export default class TransitionUsecase{
  private pointApi: IPointApi
  private traceApi: ITraceApi
  private workspaceApi: IWorkspaceApi;
  private root: IRoot
  @observable traceKeyword: string = ""

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
      const res = _.some(keywords.map(y => target.includes(y.trim())));
      return res;
    });
  }
  fetchAll = () => {
    this.fetchTraces();
    this.fetchWorkspaces();
  }

  fetchWorkspaces = async () => {
    const rows = await this.workspaceApi.all();
    if(rows === undefined) {return;}
    rows.forEach(x => this.root.workspaceStore.upsert(x.id, x));
  }

  fetchTraces = async () => {
    const rows = await this.traceApi.all();
    if(rows === undefined) {return;}
    rows.forEach(x => this.root.traceStore.upsert(x.id, x));
  }
  @action add = async (
    traceId: string,
  ) => {
    const transition = {
      id: traceId,
      traceId: traceId,
      smoothWeight: 0.0,
      isLog: false,
      isScatter:false,
      isDatetime:true,
      fromDate: moment().add(-1, 'days'),
      toDate: moment(),
    };
    const points = await this.root.loadingStore.dispatch<Promise<IPoint[]>>(
      () => this.pointApi.rangeBy(traceId, transition.fromDate, transition.toDate)
    );
    if(points === undefined){return;}
    this.root.transitionStore.upsert(transition.id, transition);
    this.root.segmentStore.upsert(transition.id, points);
  }

  @action setTraceKeyword = (keyword: string) => {
    this.traceKeyword = keyword;
  }

  @action updateSmoothWeight = (id: string, value: number) => {
    const transition = this.root.transitionStore.rows.get(id);
    if(transition === undefined){return;}
    this.root.transitionStore.upsert(id, {
      ...transition,
      smoothWeight:value,
    });
  }


  @action updateRange = async (id: string, fromDate: Moment, toDate: Moment) => {
    const transition = this.root.transitionStore.rows.get(id);
    if(transition === undefined){return;}
    this.root.transitionStore.upsert(id, {
      ...transition,
      fromDate,
      toDate,
    });
    const points = await this.root.loadingStore.dispatch<Promise<IPoint[]>>(
      () => this.pointApi.rangeBy(transition.traceId, fromDate, toDate)
    );
    if(points === undefined){return;}
    this.root.segmentStore.upsert(id, points);
  }

  @action toggleIsScatter = (id: string) => {
    const row = this.root.transitionStore.rows.get(id);
    if(row){
      this.root.transitionStore.upsert(id, {
        ...row,
        isScatter:!row.isScatter,
      });
    }
  }

  @action toggleIsDatetime = (id: string) => {
    const row = this.root.transitionStore.rows.get(id);
    if(row){
      this.root.transitionStore.upsert(id, {
        ...row,
        isDatetime:!row.isDatetime,
      });
    }
  }

  @action toggleIsLog = (id: string) => {
    const row = this.root.transitionStore.rows.get(id);
    if(row){
      this.root.transitionStore.upsert(id, {
        ...row,
        isLog:!row.isLog,
      });
    }
  }

  @action delete = (id: string) => {
    this.root.segmentStore.delete(id);
    this.root.transitionStore.delete(id);
  }
}
