import React from 'react';
import styled from 'styled-components';
import ReactJson from 'react-json-view';
import { 
  IWorkspace,
} from "~/models/interfaces";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.25em;
`;



export interface IProps {
  workspace: IWorkspace;
  Child: React.ComponentType<{workspace: IWorkspace}>;
}

export default class Workspace extends React.Component<IProps> {
  render = () => {
    const {workspace, Child} = this.props;
    return (
      <Layout className="card">
        <ReactJson 
          src={workspace.params} 
          collapsed={true}
          name={workspace.name}
          iconStyle="square"
          enableClipboard={false}
          displayDataTypes={false}
          theme="ocean"
          style={{fontSize:"1em", fontFamily:"sans-serif"}}
        />
        <Child workspace={workspace}/>
      </Layout>
    );
  }
}

