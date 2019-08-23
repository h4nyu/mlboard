import axios from 'axios';
import {IPoint} from '~/core/models';

export const searchBy =  async (keyward: string): Promise<string[]> => {
  const res = await axios.get('api/trace/search-by', {
    params:{
      keyward:keyward
    }
  });
  const resData = res.data as string[];
  return resData;
};

export const rangeBy =  async (traceId: string, fromDate: string, toDate: string): Promise<IPoint[]> => {
  const res = await axios.get('api/trace/range-by', {
    params: {
      id: traceId,
      from_date:fromDate,
      to_date:toDate
    }
  });
  const resData = res.data as {
    value: number;
    ts: string;
  }[];
  return resData; 
};
