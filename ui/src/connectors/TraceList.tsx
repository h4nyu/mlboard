import { observer } from 'mobx-react';
import React from "react";
import TraceList from '~/containers/TraceList';
import TraceConfig from "~/connectors/TraceConfig";
import store from "~/store";
const {traceStore} = store;


const Component = () => (
  <TraceList
    traces={traceStore.rows}
    Child={TraceConfig}
  />
);
export default observer(Component);
