import React from 'react'
import styled from 'styled-components'
import TheChamberList from '~/connectors/TheChamberList'
import TheTargetList from '~/connectors/TheTargetList'
import TheHeaderNav from '~/connectors/TheHeaderNav'
import TraceEventHistoryTable from '~/connectors/TraceEventHistoryTable'

const Layout = styled.div`
  display: grid;
  grid-template-areas:
    "header header"
    "chamber content";
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`
const HeaderArea = styled.div`
  grid-area: header;
  height: 52px;
`

const ChamberArea = styled.div`
  grid-area: chamber;
  display: flex;
  height: calc(100vh - 52px);
`

const ContentArea = styled.div`
  grid-area: content;
  height: calc(100vh - 52px);
`

export default class TraceEventHistoryPage extends React.Component<{}> {
  render = () => {
    return (
      <Layout>
        <HeaderArea>
          <TheHeaderNav/>
        </HeaderArea>
        <ChamberArea>
          <TheChamberList />
        </ChamberArea>
        <ContentArea>
          <TraceEventHistoryTable/>
        </ContentArea>
      </Layout>
    );
  }
};
