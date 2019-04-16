import _ from 'lodash';
import ExperimentApi from '@/services/api/ExperimentApi';
import * as loadingStore from "../loadingStore";

export const namespace = 'experiment';
export const actionTypes = {
  FETCH_ALL: `${namespace}/FETCH_ALL`,
  DELETE: `${namespace}/DELETE`,
  SELECT_ID: `${namespace}/SELECT_ID`,
  UNSELECT_ID: `${namespace}/UNSELECT_ID`,
};

export const mutationTypes = {
  BULK_SET: `${namespace}/BULK_SET`,
  DELETE: `${namespace}/DELETE`,
  SELECT_ID: `${namespace}/SELECT_ID`,
  UNSELECT_ID: `${namespace}/UNSELECT_ID`,
};


export const store = {
  namespaced: false,
  state: {
    exprimentSet: [],
    selectedIds: [],
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
          .delete({ experimentId })
          .then((res) => {
            commit(mutationTypes.BULK_SET, res.data);
          });
      };
      dispatch(loadingStore.actionTypes.DISPATCH, {callback});
    },

    [actionTypes.SELECT_ID]({ commit }, { experimentId }) {
      commit(mutationTypes.SELECT_ID, experimentId);
      // dispatch('trace/FETCH', experimentId, {root: true});
    },

    [actionTypes.UNSELECT_ID]({ commit }, id) {
      commit(mutationTypes.UNSELECT_ID, id);
      // dispatch('trace/DELETE', id, {root: true});
    },
  },
  mutations: {
    [mutationTypes.BULK_SET](state, all) {
      state.exprimentSet = _.keyBy(all, x => x.id);
    },

    [mutationTypes.DELETE](state, id) {
      state.all = [...state.all.filter(row => row.id !== id)];
    },

    [mutationTypes.SELECT_ID](state, id) {
      state.selectedIds = [...state.selectedIds, id];
    },

    [mutationTypes.UNSELECT_ID](state, id) {
      state.selectedIds = [...state.selectedIds.filter(row => row !== id)];
    },
  },
};
