import axios from 'axios';
import { TargetType, StatusLevel } from '~/core/enums'
import { IEventSection } from "~/core/models"

export const RangeBy = async (chamberIds:string[], fromDate: string, toDate: string) => {
  const res = await axios.get('api/event-section/range-by', {
    params: {
      from_date: fromDate,
      to_date: toDate,
      chamber_ids: chamberIds,
    }
  })

  const resData = res.data as {
    id: string
    from_date: string
    to_date: string
    status: StatusLevel
    code:number
    message:string
    chamber_id:string
    substract_id:string
  }[]

  const eventSections: IEventSection[] = resData.map(x => { 
    return {
      id: x.id,
      fromDate: x.from_date,
      toDate: x.to_date,
      status: x.status,
      code:x.code,
      message:x.message,
      chamberId:x.chamber_id,
      substractId:x.substract_id
    }
  })
  return eventSections
}
