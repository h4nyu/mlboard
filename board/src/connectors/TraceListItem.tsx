import { observer } from 'mobx-react';
import React from "react";
import { ITrace } from '~/models/interfaces'; 
import TraceListItem from '~/components/TraceListItem';
import store from '~/store';
const { transitionUsecase } = store;

export interface IProps{
  trace: ITrace;
}
const Component = (props: IProps) => (
  <TraceListItem
    trace={props.trace}
    onSelect={transitionUsecase.addTrace}
  />
);
export default observer(Component);
