import {actionTypes, mutationTyes, store} from '.';
import * as experimentStore from '../experimentStore';
jest.mock('@/services/api/ExperimentApi');

test(actionTypes.FETCH_ALL, () => {
  const dispatch = jest.fn()
  store.actions[actionTypes.FETCH_ALL]( { dispatch })
  expect(dispatch).toHaveBeenCalledWith(experimentStore.actionTypes.FETCH_ALL)
});
