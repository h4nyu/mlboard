import { IMaintenance } from "~/core/models"
import {  StatusLevel } from '~/core/enums'
import axios from 'axios'

interface IMaintenanceResponse {
  id: string
  name: string
  chamber_id: string
  value: number
  collect_date: string
  status:  StatusLevel
}

interface IMaintenanceForm {
  id: string
  name: string
  chamberId: string
}

export const filterIn = async (chamberIds:string[]):Promise<IMaintenance[]> => {
  const res = await axios.get('api/maintenance/filter-in', {
    params: {
      chamber_ids: chamberIds
    }
  })
  const resData = res.data as IMaintenanceResponse[]
  return resData.map(x => { 
    return {
      id: x.id,
      name: x.name,
      chamberId: x.chamber_id,
      value:  x.value,
      collectDate: x.collect_date,
      status: x.status,
    }
  })
}

export const get = async (id:string):Promise<IMaintenance|undefined> => {
  const res = await axios.get('api/maintenance', {
    params: {
      id: id
    }
  })
  const resData = res.data as IMaintenanceResponse | undefined
  if(resData){
    return {
      id: resData.id,
      name: resData.name,
      chamberId: resData.chamber_id,
      value:  resData.value,
      collectDate: resData.collect_date,
      status: resData.status,
    }
  }
}

export const upsert =  async (payload: IMaintenanceForm):Promise<string> => {
  const res = await axios.post('api/maintenance', {
    id: payload.id,
    name: payload.name,
    chamber_id: payload.chamberId,
  })
  const resData = res.data as string
  return resData
}

export const deleteBy = async (id:string):Promise<string> => {
  const res = await axios.delete('api/maintenance', {
    params: {
      id: id
    }
  })
  const resData = res.data as string
  return resData
}
