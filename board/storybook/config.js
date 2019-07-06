import { configure } from '@storybook/react';
import '@fortawesome/fontawesome-free/css/all.css'
import '~/styles/app.scss'

const req = require.context('../src', true, /stories\.tsx$/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
