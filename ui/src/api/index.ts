import {AxiosInstance} from 'axios';
import TraceApi from './TraceApi';
import PointApi from './PointApi';

export default class WebApi {
  traceApi:TraceApi
  pointApi:PointApi
  constructor(){
    this.traceApi = new TraceApi();
    this.pointApi = new PointApi();
  }
}
