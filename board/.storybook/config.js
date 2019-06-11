import { configure } from '@storybook/react';
// automatically import all files ending in *.stories.tsx
const req = require.context('../src', true, /stories\.tsx$/);
console.log(req.keys());

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
