import React from 'react';
import { ITransition } from '~/core/models'; 
import styled from 'styled-components';
import * as styles from '~/styles';
import {Map} from 'immutable';
import {IProps as IChildProps} from '~/connectors/TransitionPlot';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  ${styles.card}
`;

const Header = styled.div`
  ${styles.text}
  font-size: 1.5em;
`;

interface IProps {
  transitionMap: Map<string, ITransition>;
  Child: React.FC<IChildProps>;
}
export default class TraceList extends React.Component<IProps> {
  render = () => {
    const {transitionMap, Child} = this.props;
    return (
      <Layout>
        <Header>
          Traces
        </Header>
        {
          transitionMap.toList().map(x => (
            <Child
              key={x.id}
              transition={x}
            />
          ))
        }
      </Layout>
    );
  }
}


