import types from './types';

export default {
  [types.FETCH] ({commit, dispatch}, payload) {
    dispatch('experiment/FETCH_ALL', {}, {root: true});
  }
};

