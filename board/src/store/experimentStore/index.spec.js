import {actionTypes, mutationTypes, store} from '.';
import ExperimentApi from '@/services/api/ExperimentApi';
import * as traceStore from "../traceStore";
import uuid from 'uuid';
jest.mock('@/services/api/ExperimentApi');
let state;
beforeEach(() => {
  state = store.state()
})

test(mutationTypes.BULK_SET, () => {
  const dummy = { id: uuid()}
  store.mutations[mutationTypes.BULK_SET](state, {experiments: [dummy]})
  expect(state.experimentSet).toEqual({
    [dummy.id]: dummy
  })
});

test(mutationTypes.DELETE, () => {
  const dummy = { id: uuid()}
  const other = { id: uuid()}
  state.experimentSet = {
    [dummy.id]: dummy,
    [other.id]: other,
  }
  store.mutations[mutationTypes.DELETE](state, {experimentId: dummy.id})
  expect(state.experimentSet).toEqual({
    [other.id]: other
  })
});

test(mutationTypes.SELECT, () => {
  const id = uuid();
  state.selectedIds = []
  store.mutations[mutationTypes.SELECT](state, {experimentId: id})
  expect(state.selectedIds).toEqual([id])
});

test(mutationTypes.UNSELECT, () => {
  const id = uuid();
  state.selectedIds = [id]
  store.mutations[mutationTypes.UNSELECT](state, {experimentId: id})
  expect(state.selectedIds).toEqual([])
});

test(actionTypes.FETCH_ALL, () => {
  const dummy = [ { id: 111, } ]
  ExperimentApi.mockImplementation(() => ({
    all: () => Promise.resolve({data: dummy})
  }))
  const dispatch = jest.fn((type, {callback}) => Promise.resolve(callback()))
  const commit = jest.fn()
  return store.actions[actionTypes.FETCH_ALL]( { dispatch, commit }).then(() => {
    expect(commit).toHaveBeenCalledWith(
      mutationTypes.BULK_SET, 
      {experiments: dummy}
    )
  })
});


test(actionTypes.DELETE, () => {
  const id = uuid();
  ExperimentApi.mockImplementation(() => ({
    deleteById: () => Promise.resolve({data: id})
  }))
  const dispatch = jest.fn((type, {callback}) => Promise.resolve(callback()))
  const commit = jest.fn()
  return store.actions[actionTypes.DELETE]( { dispatch, commit }, {experimentId: id})
    .then(() => {
      expect(commit.mock.calls[0]).toEqual([
        mutationTypes.DELETE, 
        {experimentId: id}
      ])
    })
});

test(actionTypes.SELECT, () => {
  const id = uuid();
  const dispatch = jest.fn()
  const commit = jest.fn()
  store.actions[actionTypes.SELECT]( { dispatch, commit }, {experimentId: id})
  expect(dispatch.mock.calls[0]).toEqual([traceStore.actionTypes.FETCH, {experimentId: id}])
});
