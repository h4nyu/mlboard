import fp from 'lodash/fp';
import TraceApi from '@/services/api/TraceApi';
import * as loadingStore from "../loadingStore";
import * as traceStore from "../traceStore";

export const namespace = 'trace';
export const actionTypes = {
  FETCH: `${namespace}/FETCH`,
  FETCH_ALL: `${namespace}/FETCH_ALL`,
  SELECT: `${namespace}/SELECT`,
};

export const mutationTypes = {
  BULK_SET: `${namespace}/BULK_SET`,
  DELETE_BY_EXPERIMET_ID: `${namespace}/DELETE_BY_EXPERIMET_ID`,
  POP_SELECTED_ID: `${namespace}/POP_SELECTED_ID`,
  ADD_SELECTED_ID: `${namespace}/ADD_SELECTED_ID`,
};


export const store = {
  namespaced: false,
  state(){
    return {
      traceSet: {},
      selectedIds: [],
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
      const ids = Object.keys(state.traceSet);
      state.selectedIds = fp.filter(x => fp.includes(x)(ids))(state.selectedIds);
    },
    [mutationTypes.ADD_SELECTED_ID](state, {traceId}) {
      state.selectedIds = [...state.selectedIds, traceId];
    },
    [mutationTypes.POP_SELECTED_ID](state, {traceId}) {
      state.selectedIds = fp.filter(x => x !== traceId)(state.selectedIds);
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
    [actionTypes.SELECT]({ commit, dispatch }, {traceId, isSelected}) {
      if(isSelected){
        commit(mutationTypes.ADD_SELECTED_ID, {traceId});
      }else{
        commit(mutationTypes.POP_SELECTED_ID, {traceId});
      }
    }
  },
};

