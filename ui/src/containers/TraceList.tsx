import { Map } from 'immutable';
import React from 'react';
import { ITrace, IWorkspace } from '~/models/interfaces'; 
import styled from 'styled-components';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;

interface IProps {
  workspace: IWorkspace;
  traces: Map<string, ITrace>;
  Child: React.ComponentType<{trace: ITrace}>;
}
const Component = (props: IProps) => {
  const {
    traces, workspace, Child, 
  } = props;
  const filteredTrace = traces.filter(x => x.workspaceId === workspace.id);

  return (
    <Layout className="card">
      {filteredTrace.toList().map(x => <Child key={x.id} trace={x}/>)}
    </Layout>
  );
};
export default Component;
