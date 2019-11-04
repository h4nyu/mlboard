import { observer } from 'mobx-react';
import React from "react";
import { IWorkspace } from '~/models/interfaces'; 
import Workspace from '~/containers/Workspace';
import TraceList from '~/connectors/TraceList';

export interface IProps{
  workspace: IWorkspace;
}
const Component = (props: IProps) => (
  <Workspace
    workspace={props.workspace}
    Child={TraceList}
  />
);
export default observer(Component);

