import fp from 'lodash/fp';
import ExperimentApi from '@/services/api/ExperimentApi';
import * as loadingStore from "../loadingStore";
import * as traceStore from "../traceStore";

export const namespace = 'experiment';
export const actionTypes = {
  FETCH_ALL: `${namespace}/FETCH_ALL`,
  DELETE: `${namespace}/DELETE`,
  SELECT: `${namespace}/SELECT`,
  TOGGLE_ID: `${namespace}/TOGGLE_ID`,
};

export const mutationTypes = {
  BULK_SET: `${namespace}/BULK_SET`,
  DELETE: `${namespace}/DELETE`,
  TOGGLE_ID: `${namespace}/TOGGLE_ID`,
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

    [mutationTypes.TOGGLE_ID](state, {experimentId}) {
      const isExist = fp.includes(experimentId)(state.selectedIds)
      if(isExist){
        state.selectedIds = fp.filter(x => x !== experimentId)(state.selectedIds)
      }else{
        state.selectedIds = [...state.selectedIds, experimentId]
      }
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

    [actionTypes.TOGGLE_ID]({ commit }, {experimentId}) {
      commit(mutationTypes.TOGGLE_ID, {experimentId});
    },
  },
};
