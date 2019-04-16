export const namespace = 'loading';
export const mutationTypes = {
  DEACTIVATE: `${namespace}/DEACTIVATE`,
  ACTIVATE: `${namespace}/ACTIVATE`,
};

export const actionTypes = {
  DISPATCH: `${namespace}/DISPATCH`,
};

export const store = {
  namespaced: false,
  state: {
    pendingNum: 0,
  },
  mutations: {
    [mutationTypes.DEACTIVATE](state) {
      state.pendingNum -= 1;
      if (state.pendingNum < 0) {
        state.pendingNum = 0;
      }
    },
    [mutationTypes.ACTIVATE](state) {
      state.pendingNum += 1;
    },
  },
  actions: {
    [actionTypes.DISPATCH]({ state, dispatch, commit }, { callback }) {
      commit(mutationTypes.ACTIVATE);
      return Promise.resolve(callback())
        .then((res) => {
          commit(mutationTypes.DEACTIVATE);
          return res;
        })
        .catch((r) => {
          commit(mutationTypes.DEACTIVATE);
          throw r;
        });
    },
  },
};
