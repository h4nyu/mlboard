import React from "react";
import { observer } from 'mobx-react';
import PageHeader from '~/components/PageHeader';
import Search from './Search';
import store from "~/store";
const {appStore} = store;


const Component = () => (
  <PageHeader
    onRefleshClick={appStore.reflesh}
    Search={Search}
  />
);
export default observer(Component);

