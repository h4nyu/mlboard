import types from './types';

export default {
  [types.FETCH_ALL] (state, all) {
    state.all = all;
  },
};

