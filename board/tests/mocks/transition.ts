import {
  ITransition
} from '~/core/models'
import uuid from 'uuid';

export  const simple:ITransition = {
  id: uuid(),
  traceId: uuid(),
  traceSegmentId: uuid(),
}
