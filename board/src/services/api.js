import axios from 'axios'
import * as ms from './models'
import _ from 'lodash';
import snakeCaseKeys from "snakecase-keys"
import camelcaseKeys from "camelcase-keys"
axios.defaults.headers.get['Content-Type'] = 'application/json'


class JsonAPI {
  __toCamelCase(res){
    let converted;
    if(_.isObject(res.data)){
      converted = camelcaseKeys(res.data, {deep: true});
    }else{
      converted = res.data;
    }

    return {
      ...res,
      data: converted,
    }
  }

  __toSnakeCase(payload){
    let converted;
    if(_.isObject(payload)){
      converted = snakeCaseKeys(payload, {deep: true});
    }else{
      converted = payload;
    }
    return converted;  
  }

  _post(url, data) {
    return axios.post(url, this.__toSnakeCase(data)).then(this.__toCamelCase)
  }

  _put(url, data) {
    return axios.put(url, this.__toSnakeCase(data)).then(this.__toCamelCase)
  }

  _get(url, data) {
    return axios.get(url, {
      params: this.__toSnakeCase(data),
    }).then(this.__toCamelCase)
  }
}

export class ExperimentApi extends JsonAPI {
  all(){
    return this._post("api/experiment/all").then(res => ({
      ...res,
      data: res.data.map(x => new ms.Experiment(x))
    }))
  }
}


// export class TraceApi extends QueryApi {
//   constructor () {
//     super('Trace');
//   }
//
//   get ModelCls(){
//     return ms.Trace;
//   }
//
//   searchRange(sensorId, fromDate, toDate) {
//     this.payload.method = {
//       name: 'search_range',
//       args: [],
//       kwargs: {
//         sensor_id: sensorId,
//         from_date: fromDate,
//         to_date: toDate,
//       }
//     }
//     return this._post(this.url, this.payload)
//   }
// }
