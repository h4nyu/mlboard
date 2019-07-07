import { observer } from 'mobx-react';
import React from "react";
import { 
  ITrace 
} from '~/core/models'; 
import TraceListItem from '~/components/TraceListItem';

export interface IProps{
  trace: ITrace;
}
const Component = (props: IProps): React.ReactElement => (
  <TraceListItem
    trace={props.trace}
    onSelect={console.debug}
  />
);
export default observer(Component);
