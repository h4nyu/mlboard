import types from './types';

export default {
  [types.ACTIVATE] ({commit, dispatch}) {
    commit(types.ACTIVATE);
  },

  [types.DEACTIVATE] ({commit, dispatch}, payload) {
    commit(types.DEACTIVATE);
  },

  [types.DISPATCH] ({commit, dispatch, state}, callback) {
    commit(types.ACTIVATE);
    return Promise.resolve(callback())
      .then(res => {
        commit(types.DEACTIVATE);
        return res;
      })
      .catch(r => {
        commit(types.DEACTIVATE);
        throw r;
      });
  }
};
