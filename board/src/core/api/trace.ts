import axios from 'axios';
import { IPoint } from "~/core/models";


export const rangeBy =  async (
  id: string, fromDate: string, toDate: string, limit: number=10000
): Promise<IPoint[]>  => {
  const res = await axios.get('api/trace/range-by', {
    params: {
      id: id,
      from_date: fromDate,
      to_date: toDate,
      limit: limit,
    }
  });
  const resData = res.data as {
    value: number;
    ts: string;
  }[];

  return resData.map(x => { 
    return {
      value: x.value,
      ts: x.ts,
    };
  });
};
