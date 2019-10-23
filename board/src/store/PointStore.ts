import { observable, action, } from 'mobx';
import { IPointApi } from '~/api/interfaces';
import { IRoot } from './interfaces';
import { IPoint } from '~/models/interfaces'; 

export default class PointStore{
  @observable points: Map<string, IPoint[]> = new Map();

  private pointApi: IPointApi
  private root: IRoot

  constructor(
    root: IRoot,
    pointApi: IPointApi,
  ){
    this.root = root;
    this.pointApi = pointApi;
  }
  @action setPoints = (traceId: string, rows: IPoint[]) => {
    this.points.set(traceId, rows);
  }

  @action fetch = async (traceId: string) => {
    const rows = await this.pointApi.rangeBy(
      traceId, 
      this.root.traceStore.fromDate,
      this.root.traceStore.toDate,
    );
    this.setPoints(traceId, rows);
  }
}

