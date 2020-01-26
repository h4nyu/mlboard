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

  dispatch = async(callback: () => Promise<void>) => {
    this.activate();
    try {
      await callback();
    } catch(e) {
      throw e;
    } 
    finally{
      this.deactivate();
    }
  }
}
