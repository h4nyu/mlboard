import { ITransition, ITrace } from '~/models/interfaces'
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
  tag: 'tag',
  createdAt: moment(),
  updatedAt: moment(),
}
