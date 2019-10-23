import { ITrace } from '~/models/interfaces'
import uuid from 'uuid';
import moment from 'moment';

export  const simple:ITrace = {
  id:uuid(),
  tag: 'tag',
  createdAt: moment(),
  updatedAt: moment(),
}

