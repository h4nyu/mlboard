import types from './types';
import { query } from '@/services/Api';

export default {
  [types.FETCH_ALL] ({commit, state, rootState, dispatch, rootGetters}, id) {
    query("Experiment")
      .orderBy('create_date desc')
      .all()
      .then(res => {
        commit(types.FETCH_ALL, res.data)
      })
  },

  [types.DELETE] ({commit, state, rootState, dispatch, rootGetters}, experiment) {
    query("Experiment")
      .deleteCascade(experiment.id)
      .then(() => {
        commit(types.DELETE, experiment.id);
        commit(types.UNSELECT_ID, experiment.id);
      })
  },

  [types.SELECT_ID] ({commit, state, rootState, dispatch, rootGetters}, id) {
    commit(types.SELECT_ID, id)
    dispatch('trace/FETCH_ALL', {}, {root: true});
  },

  [types.UNSELECT_ID] ({commit, state, rootState, dispatch, rootGetters}, id) {
    commit(types.UNSELECT_ID, id)
    dispatch('trace/FETCH_ALL', {}, {root: true});
  },
};

