import { configure } from '@storybook/react';
import '@fortawesome/fontawesome-free/css/all.css'

const req = require.context('./stories', true, /.tsx$/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
