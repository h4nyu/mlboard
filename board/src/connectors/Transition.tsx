import { observer } from 'mobx-react';
import React from "react";
import { ITransition } from '~/models/interfaces'; 
import Transition from '~/components/Transition';
import store  from '~/store';
const {traceStore, segmentStore, workspaceStore, transitionUsecase} = store;

export interface IProps{
  transition: ITransition;
}
const Component = (props: IProps) => (
  <Transition
    transition={props.transition}
    segments={segmentStore.rows}
    workspaces={workspaceStore.rows}
    traces={traceStore.rows}
    onWeightChange={transitionUsecase.updateSmoothWeight}
    onRangeChange={transitionUsecase.updateRange}
    onClose={transitionUsecase.delete}
    onIsLogChange={transitionUsecase.toggleIsLog}
    onIsDatetimeChange={transitionUsecase.toggleIsDatetime}
    onIsScatterChange={transitionUsecase.toggleIsScatter}
  />
);
export default observer(Component);
