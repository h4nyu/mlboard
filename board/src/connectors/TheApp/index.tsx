import React from 'react'
import { observer } from 'mobx-react'
import App from '~/containers/App';
import appStore from '~/store/appStore'


const TheApp: React.FC<{}> = () => (
  <App 
    onInit={appStore.fetchAll}
  />
)

export default observer(TheApp)
