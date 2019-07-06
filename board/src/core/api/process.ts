import axios from 'axios';
import { ITarget } from "~/core/models"
import { TargetType, StatusLevel } from '~/core/enums'

export const all = async () => {
  const res = await axios.get('api/process/all')
  const resData = res.data as {
    id:	string
    name:	string
    chamber_id:	string
    status:	StatusLevel
    unit: string| null
    value: number| null
  }[]

  const rows: ITarget[] = resData.map(x => { 
    return {
      id: x.id,
      name: x.name,
      chamberId: x.chamber_id,
      unit: x.unit,
      value: x.value,
      status: x.status,
      type: TargetType.PROCESS,
      categoryname: null,
    }
  })
  return rows
}


