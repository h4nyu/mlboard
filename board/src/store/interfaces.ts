
export interface IAppStore {
  init: () => void;
}


export interface ILoadingStore {
  pendingNum: number;
  activate: () => void;
  deactivate: () => void;
  dispatch: <T>(collback: () => T) => Promise<T| undefined>;
}

export interface IRoot {
  loadingStore: ILoadingStore;
  appStore: IAppStore;
}
