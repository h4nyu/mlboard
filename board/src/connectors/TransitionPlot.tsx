import { observer } from 'mobx-react';
import React from "react";
import {TransitionPlot} from '~/components/TransitionPlot';
import { ITransition } from '~/core/models'; 
import traceStore from "~/store/traceStore";
import traceSegmentStore from "~/store/traceSegmentStore";

export interface IProps {
  transition: ITransition;
}
const Component = (props: IProps): React.ReactElement => (
  <TransitionPlot
    transition={props.transition}
    traceMap={traceStore.traceMap}
    traceSegmentMap={traceSegmentStore.traceSegmentMap}
  />
);
export default observer(Component);


