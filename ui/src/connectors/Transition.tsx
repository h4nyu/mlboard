import { observer } from 'mobx-react';
import React from "react";
import { Transition } from '~/models'; 
import TransitionComponent from '~/components/Transition';
import store  from '~/store';
const {traceStore, segmentStore, transitionUsecase} = store;

export interface IProps{
  transition: Transition;
}
const Component = (props: IProps) => (
  <TransitionComponent
    currentId={transitionUsecase.currentId}
    transition={props.transition}
    relations={transitionUsecase.relations}
    segments={segmentStore.rows}
    traces={traceStore.rows}
    onClick={transitionUsecase.select}
    onLegendCLick={transitionUsecase.deleteTrace}
    onWeightChange={transitionUsecase.updateSmoothWeight}
    onRangeChange={transitionUsecase.updateRange}
    onClose={transitionUsecase.deleteTransition}
    onIsLogChange={transitionUsecase.toggleIsLog}
    onIsDatetimeChange={transitionUsecase.toggleIsDatetime}
  />
);
export default observer(Component);
