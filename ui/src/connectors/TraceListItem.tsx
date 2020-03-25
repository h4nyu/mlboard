import { observer } from 'mobx-react';
import React from "react";
import { Trace } from '~/models'; 
import TraceListItem from '~/components/TraceListItem';
import store from '~/store';
const { transitionUsecase } = store;

export interface IProps{
  trace: Trace;
}
const Component = (props: IProps) => (
  <TraceListItem
    trace={props.trace}
    onSelect={transitionUsecase.addTrace}
  />
);
export default observer(Component);
