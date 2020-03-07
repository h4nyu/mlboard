import axios from 'axios';
import moment from 'moment';
import { IWorkspace } from "~/models/interfaces";


interface IWorkspaceRes {
  id: string;
  name: string;
  params: object;
  created_at: string;
}


export default class WorkspaceApi {
  all = async (): Promise<IWorkspace[]> => {
    const res = await axios.get(`/api/workspace/all`);
    const resData = res.data as IWorkspaceRes[];
    const rows: IWorkspace[] = resData.map(x => ({
      id: x.id,
      name:x.name,
      params:x.params,
      createdAt: moment(x.created_at),
    }));
    return rows;
  };

  delete = async (id: string): Promise<void> => {
    await axios.delete(`/api/workspace`, {
      params: {
        id: id
      }
    });
  };
}
