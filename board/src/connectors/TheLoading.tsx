import React from 'react'
import { observer } from 'mobx-react'
import loadingStore from '~/store/loadingStore'
import Loading from '~/components/Loading';

const TheLoading = () => (
  <Loading
    pendingNum={loadingStore.pendingNum}
  />
)
export default observer(TheLoading)
