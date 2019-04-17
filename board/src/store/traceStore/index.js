import fp from 'lodash/fp';
import ExperimentApi from '@/services/api/ExperimentApi';
import * as loadingStore from "../loadingStore";
import * as traceStore from "../traceStore";

export const namespace = 'trace';
export const actionTypes = {
  FETCH: `${namespace}/FETCH`,
  FETCH_ALL: `${namespace}/FETCH_ALL`,
  DELETE: `${namespace}/DELETE`,
};

export const mutationTypes = {
  BULK_SET: `${namespace}/BULK_SET`,
  DELETE: `${namespace}/DELETE`,
};


export const store = {
  namespaced: false,
  state(){
    return {
      traceSet: {}
    }
  },
  mutations: {
    [mutationTypes.BULK_SET](state, {traces}) {
      state.traceSet = fp.keyBy(x => x.id)(traces);
    },

    [mutationTypes.DELETE](state, {experimentId}) {
      state.experimentSet = fp.pickBy((value, key) => key !== experimentId)(state.experimentSet);
    },
  },
  actions: {
    [actionTypes.FETCH_ALL]({ commit, dispatch }) {
    },
  },
};

