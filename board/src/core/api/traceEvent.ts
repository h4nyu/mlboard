import axios from 'axios';
import { TargetType, TraceEventName } from '~/core/enums'
import { ITraceEvent } from "~/core/models"

export const rangeBy = async (fromDate: string, toDate: string, chamberIds:string[]) => {
  const res = await axios.get('api/trace-event/range-by', {
    params: {
      from_date: fromDate,
      to_date: toDate,
      chamber_ids: chamberIds
    }
  })

  const resData = res.data as {
    id: string
    config_id: string
    occurred_date: string
    name: TraceEventName
  }[]

  const TraceEvents: ITraceEvent[] = resData.map(x => { 
    return {
      id: x.id,
      configId:x.config_id,
      occurredDate:x.occurred_date,
      name: x.name,
    }
  })
  return TraceEvents
}
