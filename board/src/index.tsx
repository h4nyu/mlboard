import React from 'react';
import { render } from 'react-dom';
import App from '~/connectors/App';
import { spy } from 'mobx';
import './config';

spy((event) => {
  if (event.type === 'action') {
    console.log(`${event.name} with args: ${event.arguments}`);
  }
});

render(<App/>, document.getElementById('app'));
