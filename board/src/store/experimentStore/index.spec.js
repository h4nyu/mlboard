import {actionTypes, mutationTypes, store} from '.';
import ExperimentApi from '@/services/api/ExperimentApi';
jest.mock('@/services/api/ExperimentApi');

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
