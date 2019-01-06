import types from './types';
import { query } from '@/services/Api';

export default {
  [types.FETCH_ALL] ({commit, state, rootState, dispatch, rootGetters}, id) {
    query("Trace")
      .inFilter({experiment_id:rootState.experiment.selectedIds})
      .all()
      .then(res => {
        commit(types.FETCH_ALL, res.data);
      })
  },
};

