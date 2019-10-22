import {
  IRoot,
} from "./interfaces";


export default class AppStore {
  private root: IRoot;

  constructor(
    root: IRoot,
  ){
    this.root = root;
  }
  init = () => {
  }
}
