import axios from 'axios';
import moment from 'moment';
import { ITrace } from "~/models/interfaces";


interface ITraceRes {
  id: string;
  tag: string;
  workspace_id: string;
  updated_at: string;
  created_at: string;
}


export default class TraceApi {
  all = async (): Promise<ITrace[]> => {
    const res = await axios.get(`api/trace/all`);
    const resData = res.data as ITraceRes[];
    const rows: ITrace[] = resData.map(x => ({
      id: x.id,
      tag:x.tag,
      workspaceId:x.workspace_id,
      createdAt: moment(x.created_at),
      updatedAt: moment(x.updated_at),
    }));
    return rows;
  };
}
