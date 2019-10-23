import React from 'react';
import { observer } from 'mobx-react';
import {loadingStore} from '~/store';
import Loading from '~/components/Loading';

const Component = () => (
  <Loading
    pendingNum={loadingStore.pendingNum}
  />
);
export default observer(Component);
