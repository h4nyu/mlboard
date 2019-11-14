import React from "react";
import { observer } from 'mobx-react';
import PageHeader from '~/components/PageHeader';
import store from "~/store";
const {appStore} = store;


const Component = () => (
  <PageHeader
    onRefleshClick={appStore.reflesh}
  />
);
export default observer(Component);

