import { Map } from 'immutable';
import React from 'react';
import { ITrace, IWorkspace } from '~/models/interfaces'; 
import styled from 'styled-components';
import TextInput from '~/components/TextInput';
import { IProps as IChildProps } from '~/connectors/TraceListItem';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: scroll;
`;

interface IProps {
  workspace: IWorkspace
  traces: Map<string, ITrace>;
  keyword: string;
  onInput: (keyword: string) => void;
  Child: React.ComponentType<IChildProps>;
}
const Component = (props: IProps) => {
  const {
    traces, workspace,Child, 
    onInput, keyword,
  } = props;
  const filteredTrace = traces.filter(x => x.workspaceId === workspace.id)

  return (
    <Layout className="card">
      <TextInput 
        defaultValue={keyword}
        onInput={onInput}
      />
      {Array.from(filteredTrace.values()).map(x => <Child key={x.id} trace={x}/>)}
    </Layout>
  );
};
export default Component;
