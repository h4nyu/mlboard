import types from './types';
import { query } from '@/services/Api';

export default {
  [types.FETCH_ALL] ({commit, state, rootState, dispatch, rootGetters}) {
    const callback = () => query("Experiment")
      .all()
      .then(res => {
        commit(types.FETCH_ALL, res.data)
      });
    dispatch('loading/DISPATCH', callback, {root: true});
  },

  [types.DELETE] ({commit, state, rootState, dispatch, rootGetters}, experiment) {
    query("Experiment")
      .deleteCascade(experiment.id)
      .then(() => {
        commit(types.DELETE, experiment.id);
        dispatch(types.UNSELECT_ID, experiment.id);
      })
  },

  [types.SELECT_ID] ({commit, state, rootState, dispatch, rootGetters}, id) {
    commit(types.SELECT_ID, id)
    dispatch('trace/FETCH', id, {root: true});
  },

  [types.UNSELECT_ID] ({commit, state, rootState, dispatch, rootGetters}, id) {
    commit(types.UNSELECT_ID, id)
    dispatch('trace/DELETE', id, {root: true});
  },
};

