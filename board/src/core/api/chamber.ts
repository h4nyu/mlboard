import axios from 'axios';
import { TargetType, StatusLevel } from '~/core/enums'
import { IChamber } from "~/core/models"

export const all = async () => {
  const res = await axios.get('api/chamber/all')
  const resData = res.data as {
    id: string
    name: string
    block_name: string
    error_count: number
    warning_count: number
    status: StatusLevel
  }[]

  const chambers: IChamber[] = resData.map(x => { 
    return {
      id: x.id,
      name: x.name,
      blockName: x.block_name,
      errorCount: x.error_count,
      warningCount: x.warning_count,
      status: x.status,
    }
  })
  return chambers
}
