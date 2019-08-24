import React from 'react';
import styled from 'styled-components';

const Layout = styled.div`
  display: grid;
  grid-template-areas:
    "header header"
    "trace transition";
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`
const HeaderArea = styled.div`
  grid-area: header;
  height: 52px;
`

const TransitionArea = styled.div`
  grid-area: transition;
  height: calc(100vh - 53px);
`

export default class TracePage extends React.Component<{}> {
  render = () => {
    return (
      <Layout>
        <HeaderArea>
        </HeaderArea>
        <TransitionArea>
        </TransitionArea>
      </Layout>
    );
  }
};
