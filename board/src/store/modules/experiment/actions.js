import types from './types';
import { query } from '@/services/Api';

export default {
  [types.FETCH_ALL] ({commit, state, rootState, dispatch, rootGetters}, id) {
    query("Experiment")
      .all()
      .then(res => {
        console.log(res);
      })
  },
};

