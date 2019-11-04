import { Map } from 'immutable';
import React from 'react';
import { IWorkspace } from '~/models/interfaces'; 
import styled from 'styled-components';
import TextInput from '~/components/TextInput';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: scroll;
`;

interface IProps {
  workspaces: Map<string, IWorkspace>;
  keyword: string;
  onInput: (keyword: string) => void;
  Child: React.ComponentType<{workspace: IWorkspace}>;
}
const Component = (props: IProps) => {
  const {
    workspaces, Child, 
    onInput, keyword,
  } = props;
  return (
    <Layout className="card">
      <TextInput 
        defaultValue={keyword}
        onInput={onInput}
      />
      {Array.from(workspaces.values()).map(x => <Child key={x.id} workspace={x}/>)}
    </Layout>
  );
};
export default Component;
