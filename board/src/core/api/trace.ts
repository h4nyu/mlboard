import axios from 'axios';
import { ITrace } from "~/core/models";


export const all =  async (
): Promise<ITrace[]>  => {
  const res = await axios.get('api/trace/all');
  const resData = res.data as {
    id: string;
    name: string;
    value: number;
  }[];

  return resData.map(x => { 
    return {
      id: x.id,
      name: x.name,
      value: x.value,
    };
  });
};
