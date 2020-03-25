import { observer } from 'mobx-react';
import React from "react";
import { IWorkspace } from '~/models/interfaces'; 
import TraceList from '~/containers/TraceList';
import TraceListItem from "~/connectors/TraceListItem";
import store from "~/store";
const {transitionUsecase} = store;

export interface IProps{
  workspace: IWorkspace;
}

const Component = (props: IProps) => (
  <TraceList
    workspace={props.workspace}
    traces={transitionUsecase.traces}
    Child={TraceListItem}
  />
);
export default observer(Component);
