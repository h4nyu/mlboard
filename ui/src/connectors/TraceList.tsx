import { observer } from 'mobx-react';
import React from "react";
import TraceList from '~/containers/TraceList';
import TraceListItem from "~/connectors/TraceListItem";
import store from "~/store";
const {traceStore} = store;


const Component = () => (
  <TraceList
    traces={traceStore.rows}
    Child={TraceListItem}
  />
);
export default observer(Component);
