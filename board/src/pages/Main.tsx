import React from 'react';
import TraceList from '~/connectors/TraceList';
import styled from 'styled-components';

const Layout = styled.div`
`;

export default class TracePage extends React.Component<{}> {
  render = () => {
    return (
      <Layout>
        <TraceList />
      </Layout>
    );
  }
};
