import { observer } from 'mobx-react';
import React from "react";
import TraceList from '~/containers/TraceList';
import TraceListItem from "~/connectors/TraceListItem";
import traceStore from "~/store/traceStore";

const Component = (): React.ReactElement => (
  <TraceList
    traceMap={traceStore.traceMap}
    Child={TraceListItem}
  />
);
export default observer(Component);

