import React from 'react';
import { render } from 'react-dom';
import TheApp from '~/connectors/TheApp';
import '@fortawesome/fontawesome-free/css/all.css'
import '~/styles/app.scss'
import qs from 'qs';
import axios from 'axios';
import 'react-virtualized/styles.css';
axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.paramsSerializer = params => {
  return qs.stringify(params, {arrayFormat: 'repeat'});
};

render(<TheApp/>, document.getElementById('app'));
