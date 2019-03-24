import axios from 'axios';
import _ from 'lodash';
import snakeCaseKeys from 'snakecase-keys';
import camelcaseKeys from 'camelcase-keys';
import * as ms from './models';

axios.defaults.headers.get['Content-Type'] = 'application/json';

class JsonAPI {
  _toCamelCase(res) {
    let converted;
    if (_.isObject(res.data)) {
      converted = camelcaseKeys(res.data, { deep: true });
    } else {
      converted = res.data;
    }

    return {
      ...res,
      data: converted,
    };
  }

  _toSnakeCase(payload) {
    let converted;
    if (_.isObject(payload)) {
      converted = snakeCaseKeys(payload, { deep: true });
    } else {
      converted = payload;
    }
    return converted;
  }

  _post(url, data) {
    return axios.post(url, this._toSnakeCase(data)).then(this._toCamelCase);
  }

  _put(url, data) {
    return axios.put(url, this._toSnakeCase(data)).then(this._toCamelCase);
  }

  _get(url, data) {
    return axios
      .get(url, {
        params: this._toSnakeCase(data),
      })
      .then(this._toCamelCase);
  }
}

export class ExperimentApi extends JsonAPI {
  all() {
    return this._post('api/experiment/all').then(res => ({
      ...res,
      data: res.data.map(x => new ms.Experiment(x)),
    }));
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
