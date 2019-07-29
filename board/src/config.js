import '@fortawesome/fontawesome-free/css/all.css';
import qs from 'qs';
import axios from 'axios';
import 'react-virtualized/styles.css';
axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.paramsSerializer = params => {
  return qs.stringify(params, {arrayFormat: 'repeat'});
};

