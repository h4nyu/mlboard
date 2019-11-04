import React from 'react';
import { Map } from "immutable";
import styled from 'styled-components';
import { 
  IWorkspace,
} from "~/models/interfaces";
import { IProps as IChildProps } from "~/connectors/TraceList";

const Layout = styled.div`
  display: grid;
  grid-template-areas:
    "header"
    "content";
`;

const Header= styled.div`
  grid-area: header;
  background-color: #EEEEEE;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Content = styled.div`
  grid-area: content;
`;

const HeaderItem = styled.span`
  margin-left: 0.5em;
  margin-right: 0.5em;
  font-weight: bold;
`;


export interface IProps {
  workspace: IWorkspace;
  Child: React.ComponentType<IChildProps>;
}

export default class Workspace extends React.Component<IProps> {
  render = () => {
    const {workspace, Child} = this.props;

    return (
      <Layout>
        <Header className={"card"}>
          <HeaderItem>{workspace.name}</HeaderItem>
        </Header>
        <Content>
          <Child workspace={workspace}/>
        </Content>
      </Layout>
    );
  }
}

