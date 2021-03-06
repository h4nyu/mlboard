import { observer } from 'mobx-react';
import React from "react";
import TransitionList from '~/containers/TransitionList';
import Transition from "~/connectors/Transition";
import store from "~/store";

const {transitionStore, transitionUsecase} = store;


const Component = () => (
  <TransitionList
    transitions={transitionStore.rows}
    onAddClick={transitionUsecase.addTransition}
    Child={Transition}
  />
);
export default observer(Component);


