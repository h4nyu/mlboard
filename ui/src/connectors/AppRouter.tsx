import React from "react";
import { observer } from 'mobx-react';
import routes from '~/routes';
import AppRouter from '~/containers/AppRouter';

const Component = () => (
  <AppRouter
    routes={routes}
  />
);

export default observer(Component);
