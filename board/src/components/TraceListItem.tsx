import React from 'react';
import { ITrace } from '~/models/interfaces'; 
import styled from 'styled-components';
import * as styles from '~/styles';


const Layout = styled.div`
  display: grid;
  grid-template-areas: "ta space up";
  grid-template-columns: auto 1fr auto;
  padding: 0.5em;
  &:hover {
    background-color: #EEEEEE;
  };
  ${styles.card}
  cursor: pointer;
`;

const Tag = styled.div`
  grid-area: ta;
  ${styles.text}
`;

const Space = styled.div`
  grid-area: space;
  min-width: 2em;
`;

const UpdatedAt = styled.div`
  grid-area: up;
  ${styles.text}
`;


interface IProps {
  trace: ITrace;
  onSelect: (traceId: string) => void;
}
export default class TraceListItem extends React.Component<IProps> {
  render = () => {
    const {trace} = this.props;
    return (
      <Layout onClick={() => this.props.onSelect(trace.id)}>
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
