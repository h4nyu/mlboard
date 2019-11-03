import { observable, action  } from "mobx";
import { Map } from "immutable";

export default class ModelStore<T> {
  @observable rows: Map<string, T> = Map({});

  @action delete = (id: string) => {
    this.rows = this.rows.delete(id);
  }

  @action upsert = (id: string, row: T) => {
    this.rows = this.rows.set(id, row);
  }
}
