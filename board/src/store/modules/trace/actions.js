import types from './types';
import { query } from '@/services/Api';

export default {
  [types.FETCH_ALL] ({commit, state, rootState, dispatch, rootGetters}, id) {
    query("Experiment")
      .all()
      .then(res => {
        commit(types.FETCH_ALL, res.data)
      })
  },

  [types.SET_EXPERIMENT_IDS] ({commit, state, rootState, dispatch, rootGetters}, experiments) {
    const tags = experiments.map(x => x.tag);
    commit(types.SET_TAGS, tags);
    console.log(tags);
    query('Trace')
      .inFilter({tag:tags})
      .all()
      .then(r => {
        console.log(r);
      })

  },
};

