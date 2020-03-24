import axios from 'axios';
import moment, {Moment} from 'moment';
import { Point } from "~/models";


interface IPointRes {
  value: number;
  config_id: string;
  ts: string;
}


export default class PointApi {
  rangeBy = async (traceId: string, fromDate: Moment, toDate: Moment): Promise<Point[]> => {
    const res = await axios.get(`/api/point/range-by`, {
      params: {
        trace_id: traceId,
        from_date: fromDate.toISOString(),
        to_date: toDate.toISOString()
      },
    });
    const resData = res.data as IPointRes[];
    const rows: Point[] = resData.map(x => ({
      value: x.value,
      ts: moment(x.ts),
    }));
    return rows;
  };
}

