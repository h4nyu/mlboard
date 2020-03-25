import React from 'react';
import { observer } from 'mobx-react';
import App from '~/containers/App';
import AppRouter from '~/connectors/AppRouter';
import Loading from '~/connectors/Loading';
import store from '~/store';
const {appStore} = store;


const Component = () => {
  return <App 
    AppRouter={AppRouter}
    Loading={Loading}
    onInit={appStore.init}
  />;
};
export default observer(Component);
