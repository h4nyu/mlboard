import types from './types';
import { ExperimentApi } from '@/services/api';

export default {
  [types.FETCH_ALL]({ commit, dispatch }) {
    const callback = () => {
      new ExperimentApi()
        .all()
        .then((res) => {
          commit(types.FETCH_ALL, res.data);
        });
    };
    dispatch('loading/DISPATCH', callback, { root: true });
  },

  [types.DELETE]({ commit, dispatch }, { experimentId }) {
    const callback = () => {
      new ExperimentApi()
        .delete({ experimentId })
        .then((res) => {
          commit(types.FETCH_ALL, res.data);
        });
    };
    dispatch('loading/DISPATCH', callback, { root: true });
  },

  [types.SELECT_ID]({ commit }, { experimentId }) {
    commit(types.SELECT_ID, experimentId);
    // dispatch('trace/FETCH', experimentId, {root: true});
  },

  [types.UNSELECT_ID]({ commit }, id) {
    commit(types.UNSELECT_ID, id);
    // dispatch('trace/DELETE', id, {root: true});
  },
};
