import '~/styles';
import { configure, addDecorator } from '@storybook/react';
import { configureActions } from '@storybook/addon-actions';
import { withKnobs}  from '@storybook/addon-knobs';

const req = require.context('../stories', true, /\.tsx$/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);

configureActions({
  depth: 100,
  limit: 20,
});

addDecorator(withKnobs);
