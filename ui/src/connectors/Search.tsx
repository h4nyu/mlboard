import React from 'react';
import { observer } from 'mobx-react';
import Search from '~/components/Search';
import store from '~/store';
const { searchUsecase, traceStore,transitionUsecase } = store;

const Component = () => (
  <Search
    defaultValue={""}
    onInput={searchUsecase.setKeyword}
    onSelect={transitionUsecase.addTrace}
    traces={traceStore.rows}
  />
);
export default observer(Component);

