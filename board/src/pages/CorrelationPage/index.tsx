import React from 'react'
import styled from 'styled-components'
import TheChamberList from '~/connectors/TheChamberList'
import TheTargetList from '~/connectors/TheTargetList'
import TheHeaderNav from '~/connectors/TheHeaderNav'
import TheCorrelationList from '~/connectors/TheCorrelationList'

const Layout = styled.div`
  display: grid;
  grid-template-areas:
    "header header header"
    "chamber target transition";
  grid-template-columns: auto auto 1fr;
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

const TargetArea = styled.div`
  grid-area: target;
  height: calc(100vh - 52px);
`

const TransitionArea = styled.div`
  grid-area: transition;
  height: calc(100vh - 52px);
`

export default class CorrelationPage extends React.Component<{}> {
  render = () => {
    return (
      <Layout>
        <HeaderArea>
          <TheHeaderNav/>
        </HeaderArea>
        <ChamberArea>
          <TheChamberList />
        </ChamberArea>
        <TargetArea>
          <TheTargetList />
        </TargetArea>
        <TransitionArea>
          <TheCorrelationList/>
        </TransitionArea>
      </Layout>
    );
  }
};
