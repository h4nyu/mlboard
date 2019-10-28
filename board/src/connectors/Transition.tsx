import { observer } from 'mobx-react';
import React from "react";
import { ITransition } from '~/models/interfaces'; 
import Transition from '~/components/Transition';
import {traceStore, segmentStore, transitionStore} from '~/store';

export interface IProps{
  transition: ITransition;
}
const Component = (props: IProps) => (
  <Transition
    transition={props.transition}
    segments={segmentStore.segments}
    traces={traceStore.traces}
    onClose={transitionStore.deleteById}
    onIsLogChange={transitionStore.toggleIsLog}
    onIsDatetimeChange={transitionStore.toggleIsDatetime}
    onIsScatterChange={transitionStore.toggleIsScatter}
  />
);
export default observer(Component);
