import { observer } from 'mobx-react';
import React from "react";
import { Trace } from '~/models'; 
import TraceConfig from '~/components/TraceConfig';
import store from '~/store';
const { traceUsecase } = store;

export interface IProps{
  trace: Trace;
}
const Component = (props: IProps) => (
  <TraceConfig
    trace={props.trace}
    onDeleteClick={traceUsecase.deleteTrace}
  />
);
export default observer(Component);
