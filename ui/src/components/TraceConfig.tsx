import React from 'react';
import { Trace } from '~/models'; 
import styled from 'styled-components';


const Layout = styled.div`
  display: flex;
  align-items: center;
`;


const Space = styled.div`
  min-width: 2em;
  flex-grow: 1;
`;

const Item = styled.div`
  padding-left: 0.5em;
`;

const DeleteBtn = styled.div`
  white-space:nowrap;
  justify-self: flex-end;
`;


interface IProps {
  trace: Trace;
  onDeleteClick: (traceId: string) => void;
}
export default class TraceListItem extends React.Component<IProps> {
  render = () => {
    const {trace, onDeleteClick} = this.props;
    return (
      <Layout className="card">
        <Item>
          {trace.name}
        </Item>
        <Space />
        <Item>
          {trace.updatedAt.fromNow()}
        </Item>
        <Item>
          <DeleteBtn onClick={() => onDeleteClick(trace.id)}className="button is-danger"> delete </DeleteBtn>
        </Item>
      </Layout>
    );
  }
}

