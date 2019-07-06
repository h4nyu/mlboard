import axios from 'axios';
import { ITraceLevel } from "~/core/models"

interface ITraceLevelResponse {
  id: string
  warning_level: number
  error_level: number
}

export const all = async ():Promise<ITraceLevel[]> => {
  const res = await axios.get('api/trace-level/all')
  const resData = res.data as ITraceLevelResponse[]
  return resData.map(x => { 
    return {
      id: x.id,
      warningLevel: x.warning_level,
      errorLevel: x.error_level,
    }
  })
}

export const get = async (id:string):Promise<ITraceLevel|undefined> => {
  const res = await axios.get('api/trace-level', {
    params: {
      id: id,
    }
  })
  const resData = res.data as ITraceLevelResponse | undefined
  if(resData){
    return {
      id: resData.id,
      warningLevel: resData.warning_level,
      errorLevel: resData.error_level,
    }
  }
}

export const upsert = async (payload: ITraceLevel):Promise<string> => {
  const res = await axios.post('api/trace-level', {
    id: payload.id,
    warning_level: payload.warningLevel,
    error_level: payload.errorLevel,
  })
  const resData = res.data as string
  return resData
}

export const deleteBy = async (id: string):Promise<string> => {
  const res = await axios.delete('api/trace-level', {
    params: {
      id: id,
    }
  })
  const resData = res.data as string
  return resData
}


  //
