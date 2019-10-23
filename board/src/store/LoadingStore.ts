import {
  observable,
  action,
} from 'mobx';

export default class LoadingStore {
  @observable pendingNum = 0;

  @action activate = () => {
    this.pendingNum = this.pendingNum + 1;
  }

  @action deactivate = () => {
    this.pendingNum = this.pendingNum - 1;
    if (this.pendingNum < 0) {
      this.pendingNum = 0;
    }
  }

  dispatch = async<T>(callback: () => T) => {
    let result: T | undefined = undefined;
    this.activate();
    try {
      result = await callback();
    } catch(e) {
      console.error(e);
      console.error('Error caught, no action taken');
    } 
    this.deactivate();
    return result;
  }
}
