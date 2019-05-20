import fp from 'lodash/fp';
import TraceApi from '@/services/api/TraceApi';
import * as loadingStore from "../loadingStore";
import * as traceStore from "../traceStore";

export const namespace = 'traceGroup';
export const actionTypes = {
};

export const mutationTypes = {
};


export const store = {
  namespaced: false,
  state(){
    return {
      set: {},
      selectedIds: [],
    }
  },
};

