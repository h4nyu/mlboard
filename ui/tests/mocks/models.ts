import { Transition, Trace } from '~/models'
import uuid from 'uuid';
import moment from 'moment';

export  const transition:Transition = {
  id:uuid(),
  smoothWeight: 1.0,
  isLog: false,
  isDatetime: false,
  fromDate: moment().add(-1, 'hours'),
  toDate: moment(),
}

export  const trace:Trace = {
  id:uuid(),
  name: 'name',
  createdAt: moment(),
  updatedAt: moment(),
}
