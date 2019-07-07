import { observer } from 'mobx-react';
import React from "react";
import App from '~/containers/App';

const Component = () => (
  <App 
    onInit={console.log}
  />
)
export default observer(Component);

