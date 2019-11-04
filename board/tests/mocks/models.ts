import { ITransition, ITrace, IWorkspace } from '~/models/interfaces'
import uuid from 'uuid';
import moment from 'moment';

export  const transition:ITransition = {
  id:uuid(),
  traceId:uuid(),
  smoothWeight: 1.0,
  isLog: false,
  isScatter: false,
  isDatetime: false,
  fromDate: moment().add(-1, 'hours'),
  toDate: moment(),
}

export  const trace:ITrace = {
  id:uuid(),
  name: 'name',
  workspaceId: uuid(),
  createdAt: moment(),
  updatedAt: moment(),
}

export const workspace:IWorkspace = {
  id:uuid(),
  name: 'name',
  params: {'lr': 0.001, epoch:200},
  createdAt: moment(),
}
