import React from 'react';
import { ITrace } from '~/models/interfaces'; 
import styled from 'styled-components';


const Layout = styled.div`
  display: grid;
  grid-template-areas: "ta space up";
  grid-template-columns: auto 1fr auto;
  padding: 0.5em;
  &:hover {
    background-color: #EEEEEE;
  };
  cursor: pointer;
`;

const Tag = styled.div`
  grid-area: ta;
`;

const Space = styled.div`
  grid-area: space;
  min-width: 2em;
`;

const UpdatedAt = styled.div`
  grid-area: up;
  white-space:nowrap;
`;


interface IProps {
  trace: ITrace;
  onSelect: (traceId: string) => void;
}
export default class TraceListItem extends React.Component<IProps> {
  render = () => {
    const {trace} = this.props;
    return (
      <Layout className="card" onClick={() => this.props.onSelect(trace.id)}>
        <Tag>
          {trace.name}
        </Tag>
        <Space />
        <UpdatedAt>
          {trace.updatedAt.fromNow()}
        </UpdatedAt>
      </Layout>
    );
  }
}
