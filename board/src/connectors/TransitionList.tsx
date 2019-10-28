import { observer } from 'mobx-react';
import React from "react";
import TransitionList from '~/containers/TransitionList';
import Transition from "~/connectors/Transition";
import {transitionStore} from "~/store";


const Component = () => (
  <TransitionList
    transitions={transitionStore.rows}
    Child={Transition}
  />
);
export default observer(Component);


