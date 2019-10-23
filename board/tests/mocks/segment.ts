import { ISegment } from '~/models/interfaces'
import uuid from 'uuid';
import moment from 'moment';

export  const simple:ISegment = {
  id:uuid(),
  traceId:uuid(),
  fromDate: moment().add(-1, 'hours'),
  toDate: moment(),
}
