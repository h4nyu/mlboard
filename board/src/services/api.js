import axios from 'axios'
import * as ms from './models'
import _ from 'lodash';
axios.defaults.headers.get['Content-Type'] = 'application/json'


class API {
  constructor() {
    this.url = ''
  }

  _post(url, data) {
    return axios.post(url, data)  
  }

  _put(url, data) {
    return axios.put(url, data).then(res => this._toModel(res))
  }

  _get(url, data) {
    return axios.get(url, {
      params: data
    }).then(res => this._toModel(res))
  }

  _toModel(res){
    let data;
    if (_.isArray(res.data)){
      data = res.data.map(x => new this.ModelCls().fromRes(x));
    }else{
      data = new this.ModelCls().fromRes(res.data);
    }
    return {
      ...res,
      data
    }
  }
}


class QueryApi extends API {
  constructor(target, entities) {
    super()
    this.payload = {
      target: target,
      method: {},
    }
    this.url = 'api/query'
  }

  all() {
    this.payload.method = {
      name: 'all',
      args: [],
      kwargs: {}
    }
    return this._post(this.url, this.payload)
  }

  filterBy(kwargs) {
    this.payload.method = {
      name: 'filter_by',
      args: [],
      kwargs: kwargs
    }
    return this._post(this.url, this.payload)
  }

  filterIn(kwargs) {
    this.payload.method = {
      name: 'filter_in',
      args: [],
      kwargs: kwargs
    }
    return this._post(this.url, this.payload)
  }

  upsert(obj) {
    this.payload.method = {
        name: 'upsert',
        args: [],
        kwargs: {
          obj: obj
        }
      }
    return this._put(this.url, this.payload)
  }
}

export class ExperimentApi extends QueryApi {
  constructor () {
    super('Experiment');
  }

  get ModelCls(){
    return ms.Experiment;
  }
}


export class TraceApi extends QueryApi {
  constructor () {
    super('Trace');
  }

  get ModelCls(){
    return ms.Trace;
  }

  searchRange(sensorId, fromDate, toDate) {
    this.payload.method = {
      name: 'search_range',
      args: [],
      kwargs: {
        sensor_id: sensorId,
        from_date: fromDate,
        to_date: toDate,
      }
    }
    return this._post(this.url, this.payload)
  }
}
