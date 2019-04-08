import axios from 'axios';
import _ from 'lodash';
import snakeCaseKeys from 'snakecase-keys';
import camelcaseKeys from 'camelcase-keys';

axios.defaults.headers.get['Content-Type'] = 'application/json';

export default class JsonApi {
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
