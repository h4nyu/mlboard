import fp from 'lodash/fp';
import TraceApi from '@/services/api/TraceApi';
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
  DELETE_BY_EXPERIMET_ID: `${namespace}/DELETE_BY_EXPERIMET_ID`,
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
      state.traceSet = {
        ...state.traceSet,
        ...fp.keyBy(x => x.id)(traces)
      }
    },
    [mutationTypes.DELETE_BY_EXPERIMET_ID](state, {experimentId}) {
      state.traceSet = fp.pickBy(x => x.experimentId !== experimentId)(state.traceSet);
    },

    [mutationTypes.DELETE](state, {experimentId}) {
      state.experimentSet = fp.pickBy((value, key) => key !== experimentId)(state.experimentSet);
    },
  },
  actions: {
    [actionTypes.FETCH]({ commit, dispatch }, {experimentId}) {
      const callback = () => {
        const api = new TraceApi();
        return api.filterBy({experimentId})
          .then( res => {
            commit(mutationTypes.BULK_SET, {traces: res.data})
          })
      }
      return dispatch(loadingStore.actionTypes.DISPATCH, {callback})
    },
  },
};

