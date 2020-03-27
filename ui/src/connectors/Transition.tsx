import { observer } from 'mobx-react';
import React from "react";
import { Transition } from '~/models'; 
import TransitionComponent from '~/components/Transition';
import store  from '~/store';
const {traceStore, transitionUsecase} = store;

export interface IProps{
  transition: Transition;
}
const Component = (props: IProps) => (
  <TransitionComponent
    transition={props.transition}
    traces={traceStore.rows}
    onWeightChange={transitionUsecase.updateSmoothWeight}
    onRangeChange={transitionUsecase.syncRange}
    onClose={transitionUsecase.deleteTransition}
    onIsLogChange={transitionUsecase.toggleIsLog}
    onIsSyncChange={transitionUsecase.toggleIsSync}
    onIsDatetimeChange={transitionUsecase.toggleIsDatetime}
  />
);
export default observer(Component);
