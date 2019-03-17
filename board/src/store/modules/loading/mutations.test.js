import mutations  from "./mutations";

describe('loading', () => {
  it('ACTIVATE', () => {
    const state = { pendingNum: 0 }
    mutations.ACTIVATE(state)
    expect(state).toEqual({
        pendingNum: 1
      });
  })
})
