import types from './types';
import _ from "lodash";

export default {
  [types.FETCH_ALL] (state, all) {
    state.all = _.keyBy(all, x => x.id);
  },

  [types.DELETE] (state, id) {
    state.all = [...state.all.filter(row => row.id !== id)];
  },

  [types.SELECT_ID] (state, id) {
    state.selectedIds = [...state.selectedIds, id];
  },

  [types.UNSELECT_ID] (state, id) {
    state.selectedIds = [...state.selectedIds.filter(row => row !== id)];
  },
};

