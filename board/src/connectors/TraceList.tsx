import { observer } from 'mobx-react';
import React from "react";
import TraceList from '~/containers/TraceList';
import TraceListItem from "~/connectors/TraceListItem";
import store from "~/store";
const {transitionUsecase} = store;


const Component = () => (
  <TraceList
    traces={transitionUsecase.traces}
    onInput={transitionUsecase.setTraceKeyword}
    keyword={transitionUsecase.traceKeyword}
    Child={TraceListItem}
  />
);
export default observer(Component);
