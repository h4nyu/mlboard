import React from 'react';
import TraceList from '~/connectors/TraceList';
import TransitionList from '~/connectors/TransitionList';
import PageHeader from '~/components/PageHeader';
import styled from 'styled-components';

const Layout = styled.div`
  display: grid;
  grid-template-areas:
    "header header"
    "col0 col1";
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;
const TraceArea = styled(TraceList)`
  grid-area: col0;
  height: calc(100vh - 52px);
`;

const TransitionArea = styled.div`
  grid-area: col1;
  height: calc(100vh - 52px);
`;
const HeaderArea = styled.div`
  grid-area: header;
  height: 52px;
`;

export default class TracePage extends React.Component<{}> {
  render = () => {
    return (
      <Layout>
        <HeaderArea>
          <PageHeader/>
        </HeaderArea>
        <TraceArea>
          <TraceList />
        </TraceArea>
        <TransitionArea>
          <TransitionList />
        </TransitionArea>
      </Layout>
    );
  }
};
