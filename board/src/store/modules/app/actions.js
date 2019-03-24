import types from './types';

export default {
  [types.FETCH]({ dispatch }) {
    dispatch('experiment/FETCH_ALL', {}, { root: true });
  },
};
