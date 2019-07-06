import { ITarget } from "~/core/models"
import axios from 'axios';
import { TargetType, StatusLevel } from '~/core/enums'

export const all = async () => {
  const res = await axios.get('api/sensor/all')
  const resData = res.data as {
    id:	string
    name:	string
    chamber_id:	string
    status:	StatusLevel
    category_name: string | null
    unit: string | null
    value: number | null
  }[]

  const rows: ITarget[] = resData.map(x => { 
    return {
      id: x.id,
      name: x.name,
      chamberId: x.chamber_id,
      status: x.status,
      type: TargetType.SENSOR,
      categoryname: x.category_name,
      unit: x.unit,
      value: x.value,
    }
  })
  return rows
}

