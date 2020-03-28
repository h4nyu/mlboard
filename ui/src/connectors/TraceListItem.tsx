import { observer } from 'mobx-react';
import React from "react";
import { Trace } from '~/models'; 
import TraceComponent from '~/components/Trace';
import store from '~/store';
const { transitionUsecase } = store;

export interface IProps{
  trace: Trace;
}
const Component = (props: IProps) => (
  <TraceComponent
    trace={props.trace}
    onSelect={transitionUsecase.addTrace}
  />
);
export default observer(Component);
