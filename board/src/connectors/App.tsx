import React from 'react';
import { observer } from 'mobx-react';
import App from '~/containers/App';
import { appStore } from '~/store';
import AppRouter from '~/connectors/AppRouter';
import Loading from '~/connectors/Loading';


const Component = () => {
  return <App 
    AppRouter={AppRouter}
    Loading={Loading}
    onInit={appStore.init}
  />;
};
export default observer(Component);
