import React from 'react';
import { ITransition } from '~/models/interfaces'; 
import styled from 'styled-components';
import * as styles from '~/styles';
import {IProps as IChildProps} from '~/connectors/Transition';
import { Map } from 'immutable';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  ${styles.card}
  height: 100%;
  overflow-y: scroll;
`;

interface IProps {
  transitions: Map<string, ITransition>;
  Child: React.ComponentType<IChildProps>;
}
const Component = (props: IProps) => {
  const {transitions, Child} = props;
  return (
    <Layout>
      {Array.from(transitions.values()).map(x => (
        <Child 
          key={x.id} 
          transition={x}
        />
      ))}
    </Layout>
  );
};
export default Component;
