import fp from 'lodash/fp';
import TraceApi from '@/services/api/TraceApi';
import * as loadingStore from "../loadingStore";
import * as traceStore from "../traceStore";

export const namespace = 'tracePoint';
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
      set: {},
    }
  },
  mutations: {
  },
  actions: {
  },
};

