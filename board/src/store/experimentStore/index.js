import fp from 'lodash/fp';
import ExperimentApi from '@/services/api/ExperimentApi';
import * as loadingStore from "../loadingStore";
import * as traceStore from "../traceStore";

export const namespace = 'experiment';
export const actionTypes = {
  FETCH_ALL: `${namespace}/FETCH_ALL`,
  DELETE: `${namespace}/DELETE`,
  SELECT: `${namespace}/SELECT`,
  UNSELECT: `${namespace}/UNSELECT`,
};

export const mutationTypes = {
  BULK_SET: `${namespace}/BULK_SET`,
  DELETE: `${namespace}/DELETE`,
  SELECT: `${namespace}/SELECT`,
  UNSELECT: `${namespace}/UNSELECT`,
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
    },

    [mutationTypes.SELECT](state, {experimentId}) {
      state.selectedIds = [...state.selectedIds, experimentId];
    },

    [mutationTypes.UNSELECT](state, {experimentId}) {
      state.selectedIds = [...state.selectedIds.filter(row => row !== experimentId)];
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
        new ExperimentApi()
          .deleteById({ experimentId })
          .then((res) => {
            commit(mutationTypes.DELETE, {experimentId: res.data});
          });
      };
      return dispatch(loadingStore.actionTypes.DISPATCH, {callback});
    },

    [actionTypes.SELECT]({ commit }, { experimentId }) {
      commit(mutationTypes.SELECT_ID, experimentId);
      dispatch(traceStore.actionTypes.FETCH, {experimentId});
    },

    [actionTypes.UNSELECT_ID]({ commit }, id) {
      commit(mutationTypes.UNSELECT_ID, id);
      // dispatch('trace/DELETE', id, {root: true});
    },
  },
};
