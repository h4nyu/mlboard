import {
  ITraceSegment
} from '~/core/models'
import uuid from 'uuid';
import moment from 'moment';

export  const simple:ITraceSegment = {
  id: uuid(),
  traceId: uuid(),
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
