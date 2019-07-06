import { IMaintenanceLog } from "~/core/models"
import axios from 'axios'

interface IResponse {
  id: string
  create_date: string
  maintenance_id: string
  occurred_date: string
}

interface IForm {
  id: string
  maintenanceId: string
  occurredDate: string
}

export const all = async ():Promise<IMaintenanceLog[]> => {
  const res = await axios.get('api/maintenance-log/all')
  const resData = res.data as IResponse[]
  return resData.map(x => { 
    return {
      id: x.id,
      maintenanceId: x.maintenance_id,
      occurredDate: x.occurred_date,
      createDate: x.create_date
    }
  })
}

export const upsert =  async (payload: IForm):Promise<string> => {
  const res = await axios.post('api/maintenance-log', {
    id: payload.id,
    occurred_date: payload.occurredDate,
    maintenance_id: payload.maintenanceId,
  })
  const resData = res.data as string
  return resData
}

export const deleteBy = async (id:string):Promise<string> => {
  const res = await axios.delete('api/maintenance-log', {
    params: {
      id: id
    }
  })
  const resData = res.data as string
  return resData
}
