import moment,{Moment} from 'moment';
import { action, observable, computed } from 'mobx';
import {Transition, Segment } from '~/models';
import {some, keyBy} from 'lodash';
import {v4 as uuid} from 'uuid';
import {RootStore} from './index';
import { Set } from "immutable";

export default class TraceUsecase{
  private root: RootStore
  @observable selectedIds: Set<string> = Set();

  constructor(
    root: RootStore,
  ){
    this.root = root;
  }

  @action deleteTrace = async (id: string) => {
    await this.root.loadingStore.dispatch(async () => {
      await this.root.api.traceApi.delete(id);
      this.root.traceStore.delete([id]);
    });
  }

  @action select = (id: string) => {
    this.selectedIds = this.selectedIds.add(id);
  }
}
