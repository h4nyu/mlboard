import React from 'react';
import TraceList from '~/connectors/TraceList';
import PageHeader from '~/connectors/PageHeader';
import styled from 'styled-components';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
export default class TracePage extends React.Component<{}> {
  render = () => {
    return (
      <Layout>
        <PageHeader />
        <TraceList/>
      </Layout>
    );
  }
};

