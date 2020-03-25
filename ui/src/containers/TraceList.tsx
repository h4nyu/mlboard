import { Map } from 'immutable';
import React from 'react';
import { Trace } from '~/models'; 
import styled from 'styled-components';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;

interface IProps {
  traces: Map<string, Trace>;
  Child: React.ComponentType<{trace: Trace}>;
}
const Component = (props: IProps) => {
  const {
    traces, Child, 
  } = props;

  return (
    <Layout className="card">
      {traces.toList().map(x => <Child key={x.id} trace={x}/>)}
    </Layout>
  );
};
export default Component;
