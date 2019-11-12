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
  display: flex;
  align-items: center;
  justify-content: space-between;
`;


const DeleteBtn = (props: {onClick: () => void}) => (
  <div className="button is-small is-danger" onClick={props.onClick}>
    <i className="far fa-trash-alt"></i>
  </div>
)

export interface IProps {
  workspace: IWorkspace;
  onDeleteClick: (workspaceId:string) => void;
  Child: React.ComponentType<{workspace: IWorkspace}>;
}

export default class Workspace extends React.Component<IProps> {
  render = () => {
    const {workspace, Child, onDeleteClick} = this.props;
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
          <DeleteBtn onClick={() => onDeleteClick(workspace.id)}/>
        </HeaderArea>
        <Child workspace={workspace}/>
      </Layout>
    );
  }
}

