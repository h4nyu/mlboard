import React from 'react';
import { render } from 'react-dom';
import App from '~/connectors/App';
import '@fortawesome/fontawesome-free/css/all.css'
import '~/styles.scss'
import qs from 'qs';
import axios from 'axios';
import 'react-virtualized/styles.css';
axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.paramsSerializer = params => {
  return qs.stringify(params, {arrayFormat: 'repeat'});
};

render(<App/>, document.getElementById('app'));
