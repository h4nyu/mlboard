import moment,{Moment} from 'moment';
import { action, observable, computed } from 'mobx';
import {some, keyBy} from 'lodash';
import uuid from 'uuid';
import {RootStore} from './index';

import { Set } from "immutable";

export default class SearchUsecase{
  private root: RootStore
  @observable keyword = "";

  constructor(
    root: RootStore,
  ){
    this.root = root;
  }
  @computed get traces(){
    return this.root.traceStore.rows.filter(
      x => x.name.includes(this.keyword)
    );
  }

  fetchTraces = async () => {
    const rows = await this.root.api.traceApi.all(this.keyword);
    if(rows === undefined) {return;}
    this.root.traceStore.upsert(keyBy(rows, x => x.id));
  }

  @action setKeyword = async (keyword: string) => {
    this.keyword = keyword;
    await this.fetchTraces();
  }
}


