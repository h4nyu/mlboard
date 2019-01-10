import types from './types';

export default {
  [types.DEACTIVATE] (state, payload) {
    state.pendingNum = state.pendingNum - 1;
    if (state.pendingNum < 0){
      state.pendingNum = 0
    }
  },

  [types.ACTIVATE] (state, payload) {
    state.pendingNum = state.pendingNum + 1;
  }
};
