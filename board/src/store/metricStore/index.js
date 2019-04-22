import fp from 'lodash/fp';
import * as loadingStore from "../loadingStore";

export const namespace = 'metric';
export const actionTypes = {
  FETCH_ALL: `${namespace}/FETCH_ALL`,
  SELECT: `${namespace}/SELECT`,
  UNSELECT: `${namespace}/UNSELECT`,
};

export const mutationTypes = {
  BULK_SET: `${namespace}/BULK_SET`,
  SELECT: `${namespace}/SELECT`,
  UNSELECT: `${namespace}/UNSELECT`,
};


export const store = {
  namespaced: false,
  state(){
    return {
      metricSet: {},
      selectedIds: [],
    }
  },
  mutations: {
    [mutationTypes.BULK_SET](state, {metrics}) {
      state.metricSet = fp.keyBy(x => x.id)(metrics);
    },

    [mutationTypes.SELECT](state, {metricId}) {
      state.selectedIds = [...state.selectedIds, metricId];
    },

    [mutationTypes.UNSELECT](state, {metricId}) {
      state.selectedIds = [...state.selectedIds.filter(row => row !== metricId)];
    },
  },
  actions: {
    [actionTypes.FETCH_ALL]({ commit, dispatch }) {
    },

    [actionTypes.SELECT]({ commit }, { metricId }) {
      commit(mutationTypes.SELECT_ID, metricId);
      dispatch(traceStore.actionTypes.FETCH, {metricId});
    },

    [actionTypes.UNSELECT_ID]({ commit }, id) {
      commit(mutationTypes.UNSELECT_ID, id);
    },
  },
};

