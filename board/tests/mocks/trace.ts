import {
  ITrace
} from '~/core/models'
import uuid from 'uuid';
import moment from 'moment';

export  const simple:ITrace = {
  id:uuid(),
  configId:uuid(),
  fromDate: moment().add(-1, 'hours').format(),
  toDate: moment().format(),
  points: [
    {
      value: 1.0,
      ts: '2000-01-01T00:00:00+0900',
    },
    {
      value: 2.0,
      ts: '2000-01-01T00:01:00+0900',
    },
    {
      value: -1.0,
      ts: '2000-01-01T00:02:00+0900',
    },
  ]
}
