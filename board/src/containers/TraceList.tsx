import React from 'react';
import { ITrace } from '~/models/interfaces'; 
import styled from 'styled-components';
import * as styles from '~/styles';
import {IProps as IChildProps} from '~/connectors/TraceListItem';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  ${styles.card}
  height: 100%;
  overflow-y: scroll;
`;

interface IProps {
  traces: Map<string, ITrace>;
  Child: React.FC<IChildProps>;
}
export default class TraceList extends React.Component<IProps> {
  render = () => {
    const {traces, Child} = this.props;
    return (
      <Layout>
        {Array.from(traces.values()).map(x => <Child key={x.id} trace={x}/>)}
      </Layout>
    );
  }
}

