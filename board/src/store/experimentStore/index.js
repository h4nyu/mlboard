import fp from 'lodash/fp';
import ExperimentApi from '@/services/api/ExperimentApi';
import * as loadingStore from "../loadingStore";
import * as traceStore from "../traceStore";

export const namespace = 'experiment';
export const actionTypes = {
  FETCH_ALL: `${namespace}/FETCH_ALL`,
  DELETE: `${namespace}/DELETE`,
  SELECT: `${namespace}/SELECT`,
};

export const mutationTypes = {
  BULK_SET: `${namespace}/BULK_SET`,
  DELETE: `${namespace}/DELETE`,
  POP_SELECTED_ID: `${namespace}/POP_SELECTED_ID`,
  ADD_SELECTED_ID: `${namespace}/ADD_SELECTED_ID`,
};


export const store = {
  namespaced: false,
  state(){
    return {
      experimentSet: {},
      selectedIds: [],
    }
  },
  mutations: {
    [mutationTypes.BULK_SET](state, {experiments}) {
      state.experimentSet = fp.keyBy(x => x.id)(experiments);
    },

    [mutationTypes.DELETE](state, {experimentId}) {
      state.experimentSet = fp.pickBy((value, key) => key !== experimentId)(state.experimentSet);
      state.selectedIds = fp.filter(x => x !== experimentId)(state.selectedIds);
    },

    [mutationTypes.ADD_SELECTED_ID](state, {experimentId}) {
      state.selectedIds = [...state.selectedIds, experimentId];
    },

    [mutationTypes.POP_SELECTED_ID](state, {experimentId}) {
      state.selectedIds = fp.filter(x => x !== experimentId)(state.selectedIds);
    },
  },
  actions: {
    [actionTypes.FETCH_ALL]({ commit, dispatch }) {
      const callback = () => {
        new ExperimentApi()
          .all()
          .then((res) => {
            commit(mutationTypes.BULK_SET, {experiments: res.data});
          });
      };
      return dispatch(loadingStore.actionTypes.DISPATCH, {callback});
    },

    [actionTypes.DELETE]({ commit, dispatch }, { experimentId }) {
      const callback = () => {
        const api = new ExperimentApi()
        return api.deleteBy({ id: experimentId })
          .then((res) => {
            commit(traceStore.mutationTypes.DELETE_BY_EXPERIMET_ID, {experimentId: res.data});
            commit(mutationTypes.DELETE, {experimentId: res.data});
          });
      };
      return dispatch(loadingStore.actionTypes.DISPATCH, {callback});
    },

    [actionTypes.SELECT]({ commit, dispatch }, { experimentId, isSelected }) {
      if(isSelected){
        commit(mutationTypes.ADD_SELECTED_ID, {experimentId});
        dispatch(traceStore.actionTypes.FETCH, {experimentId});
      }else{
        commit(mutationTypes.POP_SELECTED_ID, {experimentId});
        commit(traceStore.mutationTypes.DELETE_BY_EXPERIMET_ID, {experimentId});
      }
    },
  },
};
