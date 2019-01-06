import types from './types';

export default {
  [types.FETCH] (state, trace) {
    state.all = {...state.all, ...trace};
  },

  [types.DELETE] (state, experimentId) {
    delete state.all[experimentId]
    state.all = {...state.all}
  },
};

