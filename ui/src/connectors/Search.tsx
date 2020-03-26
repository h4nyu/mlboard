import React from 'react';
import { observer } from 'mobx-react';
import Search from '~/components/Search';
import store from '~/store';
const { searchUsecase, transitionUsecase } = store;

const Component = () => (
  <Search
    defaultValue={""}
    onInput={searchUsecase.setKeyword}
    onSelect={transitionUsecase.addTrace}
    traces={searchUsecase.traces}
  />
);
export default observer(Component);

