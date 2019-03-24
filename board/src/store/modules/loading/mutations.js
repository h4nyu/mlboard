import types from './types';

export default {
  [types.DEACTIVATE](state) {
    state.pendingNum -= 1;
    if (state.pendingNum < 0) {
      state.pendingNum = 0;
    }
  },

  [types.ACTIVATE](state) {
    state.pendingNum += 1;
  },
};
