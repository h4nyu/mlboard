import { Map } from 'immutable';
import React from 'react';
import { ITrace } from '~/models/interfaces'; 
import styled from 'styled-components';
import { IProps as IChildProps } from '~/connectors/TraceListItem';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: scroll;
`;

interface IProps {
  traces: Map<string, ITrace>;
  Child: React.ComponentType<IChildProps>;
}
const Component = (props: IProps) => {
  const {traces, Child} = props;
  return (
    <Layout className="card">
      {Array.from(traces.values()).map(x => <Child key={x.id} trace={x}/>)}
    </Layout>
  );
};
export default Component;
