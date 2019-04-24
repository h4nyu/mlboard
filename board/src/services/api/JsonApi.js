import axios from 'axios';
import _ from 'lodash';
import snakeCaseKeys from 'snakecase-keys';
import camelcaseKeys from 'camelcase-keys';

axios.defaults.headers.get['Content-Type'] = 'application/json';

export default class JsonApi {
  static _toCamelCase(res) {
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

  static _toSnakeCase(payload) {
    let converted;
    if (_.isObject(payload)) {
      converted = snakeCaseKeys(payload, { deep: true });
    } else {
      converted = payload;
    }
    return converted;
  }

  static post(url, data) {
    return axios.post(url, JsonApi._toSnakeCase(data)).then(JsonApi._toCamelCase);
  }

  static put(url, data) {
    return axios.put(url, JsonApi._toSnakeCase(data)).then(JsonApi._toCamelCase);
  }

  static get(url, param) {
    return axios
      .get(url, {
        params: JsonApi._toSnakeCase(param),
      })
      .then(JsonApi._toCamelCase);
  }
  static delete(url, param) {
    return axios
      .delete(url, {
        params: JsonApi._toSnakeCase(param),
      })
      .then(JsonApi._toCamelCase);
  }
}
