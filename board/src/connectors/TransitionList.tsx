import { observer } from 'mobx-react';
import React from "react";
import TransitionList from '~/containers/TransitionList';
import Transition from "~/connectors/Transition";
import store from "~/store";

const {transitionStore} = store;


const Component = () => (
  <TransitionList
    transitions={transitionStore.rows}
    Child={Transition}
  />
);
export default observer(Component);


