import { Transition, Trace } from '~/models'
import {v4 as uuid} from 'uuid';
import moment from 'moment';

export  const transition:Transition = {
  id:uuid(),
  smoothWeight: 1.0,
  traceId: uuid(),
  isLog: false,
  isSync: true,
  isDatetime: false,
  fromDate: moment().add(-1, 'hours'),
  toDate: moment(),
  points: [],
}

export  const trace:Trace = {
  id:uuid(),
  name: 'name',
  createdAt: moment(),
  updatedAt: moment(),
}
