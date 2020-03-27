import { Transition, Trace, Segment } from '~/models'
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
  segmentIds: [],
  toDate: moment(),
}

export  const trace:Trace = {
  id:uuid(),
  name: 'name',
  createdAt: moment(),
  updatedAt: moment(),
}

export  const segment:Segment = {
  id:uuid(),
  traceId: uuid(),
  points: [],
  fromDate: moment(),
  toDate: moment(),
}
