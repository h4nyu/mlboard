import axios from 'axios';
import { IDiff } from "~/core/models"
import { TargetType, StatusLevel } from '~/core/enums'

export const rangeBy =  async (id:string, fromDate:string, toDate:string, limit: number=10000) => {
  const res = await axios.get('api/trace/range-by', {
    params: {
      id: id,
      from_date: fromDate,
      to_date: toDate,
      limit: limit,
    }
  })
  const resData = res.data as {
    value: number
    ts: string
  }[]

  return resData.map(x => { 
    return {
      value: x.value,
      ts: x.ts,
    }
  })
}

export const diffRangeBy =  async (fromDate:string, toDate:string, chamberId:string) => {
  const res = await axios.get('api/trace/diff-range-by', {
    params: {
      from_date: fromDate,
      to_date: toDate,
      chamber_id: chamberId
    }
  })
  const resData = res.data as {
    id: string
    value: number
  }[]

  return resData.map(x => { 
    return {
      id: x.id,
      value: x.value,
    }
  })

  const Diffs: IDiff[] = resData.map(x => { 
    return {
      id: x.id,
      value:x.value,
    }
  })
  return Diffs 
}
