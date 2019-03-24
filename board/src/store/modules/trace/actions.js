import fp from 'lodash/fp';
import types from './types';
import { TraceApi } from '@/services/api';

export default {
  [types.FETCH]({
    commit, dispatch,
  }, experimentId) {
    const callback = () => new TraceApi()
      .filterBy({ experiment_id: experimentId })
      .all()
      .then((res) => {
        commit(types.FETCH, { [experimentId]: res.data });
      });
    dispatch('loading/DISPATCH', callback, { root: true });
  },

  [types.FETCH_ALL]({
    dispatch, rootState,
  }) {
    fp.forEach(id => dispatch(types.FETCH, id))(rootState.experiment.selectedIds);
  },

  [types.DELETE]({
    commit,
  }, experimentId) {
    commit(types.DELETE, (experimentId));
  },
};
