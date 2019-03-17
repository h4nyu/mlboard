import types from './types';
import { ExperimentApi } from '@/services/api';

export default {
  [types.FETCH_ALL] ({commit, state, rootState, dispatch, rootGetters}) {
    const callback = () => {
      const api = new ExperimentApi()
        .all()
        .then(res => {
          commit(types.FETCH_ALL, res.data)
        });
    }
    dispatch('loading/DISPATCH', callback, {root: true});
  },

  [types.DELETE] ({commit, state, rootState, dispatch, rootGetters}, {experimentId}) {
    // query("Experiment")
    //   .deleteCascade(experimentId)
    //   .then(() => {
    //     commit(types.DELETE, experimentId);
    //     dispatch(types.UNSELECT_ID, experimentId);
    //   })
  },

  [types.SELECT_ID] ({commit, state, rootState, dispatch, rootGetters}, {experimentId}) {
    commit(types.SELECT_ID, experimentId)
    // dispatch('trace/FETCH', experimentId, {root: true});
  },

  [types.UNSELECT_ID] ({commit, state, rootState, dispatch, rootGetters}, id) {
    commit(types.UNSELECT_ID, id)
    // dispatch('trace/DELETE', id, {root: true});
  },
};

