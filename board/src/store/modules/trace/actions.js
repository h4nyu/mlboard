import types from './types';
import { query } from '@/services/Api';

export default {
  [types.FETCH] ({commit, state, rootState, dispatch, rootGetters}, experimentId) {
    const callback = () => query("Trace")
      .filterBy({experiment_id: experimentId})
      .all()
      .then(res => {
        commit(types.FETCH, {[experimentId]: res.data});
      })
    dispatch('loading/DISPATCH', callback, {root: true});
  },

  [types.DELETE] ({commit, state, rootState, dispatch, rootGetters}, experimentId) {
    commit(types.DELETE, (experimentId))
  },
};

