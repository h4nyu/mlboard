import React from 'react'
import styled from 'styled-components'
import TheHeaderNav from '~/connectors/TheHeaderNav';
import TheChamberList from '~/connectors/TheChamberList'
import MaintenanceList from '~/connectors/MaintenanceList';

const Layout = styled.div`
  display: grid;
  grid-template-areas:
    "header header"
    "chamber content"
    "chamber content";
  grid-template-columns: auto 1fr ;
  grid-template-rows: auto auto 1fr;
  height: 100vh;
`

const HeaderArea = styled.div`
  grid-area: header;
  height: 52px;
`

const ChamberArea = styled.div`
  display: flex;
  height: calc(100vh - 52px);
`

const CotentArea = styled.div`
  grid-area: content;
  height: calc(100vh - 52px);
`
export default () => (
  <Layout>
    <HeaderArea>
      <TheHeaderNav />
    </HeaderArea>
    <ChamberArea>
      <TheChamberList />
    </ChamberArea>
    <CotentArea>
      <MaintenanceList />
    </CotentArea>
  </Layout>
)
