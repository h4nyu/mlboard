import axios from 'axios';
import moment, {Moment} from 'moment';
import { IPoint } from "~/models/interfaces";


interface IPointRes {
  value: number;
  config_id: string;
  ts: string;
}


export default class PointApi {
  rangeBy = async (traceId: string, fromDate: Moment, toDate: Moment): Promise<IPoint[]> => {
    const res = await axios.get(`api/point/range-by`, {
      params: {
        trace_id: traceId,
        from_date: fromDate.toISOString(),
        to_date: toDate.toISOString()
      },
    });
    const resData = res.data as IPointRes[];
    const rows: IPoint[] = resData.map(x => ({
      value: x.value,
      ts: moment(x.ts),
    }));
    return rows;
  };
}

