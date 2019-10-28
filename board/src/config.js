import qs from 'qs';
import axios from 'axios';
axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.paramsSerializer = params => {
  return qs.stringify(params, {arrayFormat: 'repeat'});
};

