import { observer } from 'mobx-react';
import React from "react";
import TraceList from '~/containers/TraceList';
import TraceListItem from "~/connectors/TraceListItem";
import traceStore from "~/store/traceStore";


const Component = () => (
  <TraceList
    traceMap={traceStore.traces}
    Child={TraceListItem}
  />
);
export default observer(Component);

