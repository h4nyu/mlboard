import React from 'react';
import { observer } from 'mobx-react';
import Loading from '~/components/Loading';
import store from '~/store';
const { loadingStore } = store;

const Component = () => (
  <Loading
    pendingNum={loadingStore.pendingNum}
  />
);
export default observer(Component);
