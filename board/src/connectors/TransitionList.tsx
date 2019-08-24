import { observer } from 'mobx-react';
import React from "react";
import TransitionList from '~/containers/TransitionList';
import TransitionPlot from "~/components/TransitionPlot";
import traceStore from "~/store/traceStore";


const Component = (): React.ReactElement => (
  <TransitionList
    traceMap={traceStore.traceMap}
    Child={props => <TransitionPlot {...props}/>}
  />
);

export default observer(Component);
