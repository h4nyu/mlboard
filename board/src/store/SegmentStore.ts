import {Moment} from 'moment';
import { observable, action, } from 'mobx';
import { IPointApi } from '~/api/interfaces';
import { IRoot } from './interfaces';
import { IPoint } from '~/models/interfaces'; 
import { Map } from 'immutable';

export default class SegmentStore{
  @observable segments: Map<string, IPoint[]> = Map();

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
    this.segments.set(traceId, rows);
  }
  @action deleteById = (id: string) => {
    this.segments = this.segments.delete(id);
  }

  @action fetch = async (
    traceId: string,
    fromDate: Moment,
    toDate: Moment,
  ) => {
    const rows = await this.pointApi.rangeBy(
      traceId, 
      fromDate,
      toDate,
    );
    this.setPoints(traceId, rows);
  }
}
