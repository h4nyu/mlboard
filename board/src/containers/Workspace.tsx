import React from 'react';
import styled from 'styled-components';
import ReactJson from 'react-json-view';
import styles from '~/styles/app.scss';
import { 
  IWorkspace,
} from "~/models/interfaces";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.25em;
  background-color: ${styles.light};
`;
const HeaderArea = styled.div`
  display: grid;
  grid-template-areas: "params dt";
  grid-template-columns: 1fr auto;
`;



export interface IProps {
  workspace: IWorkspace;
  Child: React.ComponentType<{workspace: IWorkspace}>;
}

export default class Workspace extends React.Component<IProps> {
  render = () => {
    const {workspace, Child} = this.props;
    return (
      <Layout >
        <HeaderArea className="card"> 
          <ReactJson 
            src={workspace.params} 
            collapsed={true}
            name={workspace.name}
            iconStyle="square"
            enableClipboard={false}
            displayDataTypes={false}
            displayObjectSize={false}
            style={{fontSize:"1em", fontFamily:"sans-serif"}}
          />
        </HeaderArea>
        <Child workspace={workspace}/>
      </Layout>
    );
  }
}

