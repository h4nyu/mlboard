import moment,{Moment} from 'moment';
import { action, observable, computed } from 'mobx';
import { Segment } from '~/models'; 
import {some, keyBy} from 'lodash';
import uuid from 'uuid';
import {RootStore} from './index';

import { Set } from "immutable";

export default class SearchUsecase{
  private root: RootStore
  @observable keyword: string = "";

  constructor(
    root: RootStore,
  ){
    this.root = root;
  }

  fetchTraces = async () => {
    await this.root.loadingStore.dispatch(async () => {
      const rows = await this.root.api.traceApi.all();
      if(rows === undefined) {return;}
      this.root.traceStore.upsert(keyBy(rows, x => x.id));
    });
  }

  @action addTrace = async (traceId: string) => {
  }

  @action setKeyword = (keyword: string) => {
    this.keyword = keyword;
  }
}


