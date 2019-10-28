import React from 'react';
import { render } from 'react-dom';
import '~/styles';
import App from '~/connectors/App';
import { spy } from 'mobx';

spy((event) => {
  if (event.type === 'action') {
    console.log(`${event.name} with args: ${event.arguments}`);
  }
});

render(<App/>, document.getElementById('app'));
