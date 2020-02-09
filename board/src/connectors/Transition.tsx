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
    currentId={transitionUsecase.currentId}
    transition={props.transition}
    relations={transitionUsecase.relations}
    segments={segmentStore.rows}
    workspaces={workspaceStore.rows}
    traces={traceStore.rows}
    onClick={transitionUsecase.select}
    onWeightChange={transitionUsecase.updateSmoothWeight}
    onRangeChange={transitionUsecase.updateRange}
    onClose={transitionUsecase.deleteTransition}
    onIsLogChange={transitionUsecase.toggleIsLog}
    onIsDatetimeChange={transitionUsecase.toggleIsDatetime}
  />
);
export default observer(Component);
