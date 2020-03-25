import axios from 'axios';
import moment from 'moment';
import { Trace } from "~/models";


interface ITraceRes {
  id: string;
  name: string;
  workspace_id: string;
  updated_at: string;
  created_at: string;
}

export default class TraceApi {
  all = async (keyword=""): Promise<Trace[]> => {
    const res = await axios.get(`/api/v1/traces`, {
      params: {
        keyword: keyword
      }
    });
    const resData = res.data as ITraceRes[];
    const rows: Trace[] = resData.map(x => ({
      id: x.id,
      name:x.name,
      workspaceId:x.workspace_id,
      createdAt: moment(x.created_at),
      updatedAt: moment(x.updated_at),
    }));
    return rows;
  };
}
