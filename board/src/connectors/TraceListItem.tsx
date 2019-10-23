import { observer } from 'mobx-react';
import React from "react";
import { ITrace } from '~/models/interfaces'; 
import TraceListItem from '~/components/TraceListItem';
import {traceStore} from '~/store';

export interface IProps{
  trace: ITrace;
}
const Component = (props: IProps) => (
  <TraceListItem
    trace={props.trace}
    onSelect={traceStore.select}
  />
);
export default observer(Component);
