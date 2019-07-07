import { observer } from 'mobx-react';
import React from "react";
import App from '~/containers/App';

const Component = (): React.ReactElement => (
  <App 
    onInit={console.log}
  />
)
export default observer(Component);

