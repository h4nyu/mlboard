import axios from 'axios';
import { ITrace } from "~/core/models";

export const all =  async () => {
  const res = await axios.get('api/trace/all');
  const resData = res.data as string[]
  return resData;
}

export const rangeBy =  async (traceId:string, fromDate:string, toDate:string) => {
  const res = await axios.get('api/trace/range-by', {
    id: traceId,
    from_date:fromDate,
    to_date:toDate
  });
  const resData = res.data as {
    value: number;
    ts: string
  }[];
  return resData 
};
