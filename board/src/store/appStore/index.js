import * as experimentStore from '../experimentStore';

export const namespace = 'app';
export const actionTypes = {
  FETCH_ALL: `${namespace}/FETCH_ALL`,
};

export const store = {
  namespaced: false,
  actions: {
    [actionTypes.FETCH_ALL]({ dispatch }) {
      dispatch(experimentStore.actionTypes.FETCH_ALL);
    },
  },
};
