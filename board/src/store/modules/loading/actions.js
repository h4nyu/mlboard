import types from './types';

export default {
  [types.ACTIVATE]({ commit }) {
    commit(types.ACTIVATE);
  },

  [types.DEACTIVATE]({ commit }) {
    commit(types.DEACTIVATE);
  },

  [types.DISPATCH]({ commit }, callback) {
    commit(types.ACTIVATE);
    return Promise.resolve(callback())
      .then((res) => {
        commit(types.DEACTIVATE);
        return res;
      })
      .catch((r) => {
        commit(types.DEACTIVATE);
        throw r;
      });
  },
};
