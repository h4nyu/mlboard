import { ITransition, ITrace } from '~/models/interfaces'
import uuid from 'uuid';
import moment from 'moment';

export  const transition:ITransition = {
  id:uuid(),
  traceId:uuid(),
  isLog: false,
  isScatter: false,
  fromDate: moment().add(-1, 'hours'),
  toDate: moment(),
}

export  const trace:ITrace = {
  id:uuid(),
  tag: 'tag',
  createdAt: moment(),
  updatedAt: moment(),
}
