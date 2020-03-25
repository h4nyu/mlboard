import { observable, action  } from "mobx";
import { Map } from "immutable";

export default class ModelStore<T> {
  @observable rows: Map<string, T> = Map({});

  @action delete = (ids: string[]) => {
    this.rows = this.rows.deleteAll(ids);
  }

  @action upsert = (rows: {[key: string]: T}) => {
    this.rows = this.rows.merge(Map(rows));
  }

  @action clear = () => {
    this.rows = this.rows.clear();
  }
}
