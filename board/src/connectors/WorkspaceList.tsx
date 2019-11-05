import { observer } from 'mobx-react';
import React from "react";
import WorkspaceList from '~/containers/WorkspaceList';
import Workspace from '~/connectors/Workspace';
import store from "~/store";

const {transitionUsecase} = store;


const Component = () => (
  <WorkspaceList
    workspaces={transitionUsecase.workspaces}
    keyword={transitionUsecase.traceKeyword}
    onInput={transitionUsecase.setTraceKeyword}
    Child={Workspace}
  />
);
export default observer(Component);



