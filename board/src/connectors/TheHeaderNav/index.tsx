import React from 'react'
import { observer } from 'mobx-react'
import HeaderNav from '~/components/HeaderNav';
import appStore from '~/store/appStore'

const TheHeaderNav: React.FC<{}> = () => (
  <HeaderNav 
    onReflesh={appStore.fetchAll}
    onRouteChange={appStore.onRouteChange}
  />
)

export default observer(TheHeaderNav)


