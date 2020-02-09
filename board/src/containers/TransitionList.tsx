import React from 'react';
import { ITransition } from '~/models/interfaces'; 
import styled from 'styled-components';
import {IProps as IChildProps} from '~/connectors/Transition';
import { Map } from 'immutable';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: scroll;
`;

interface IProps {
  transitions: Map<string, ITransition>;
  onAddClick: () => void;
  Child: React.ComponentType<IChildProps>;
}
const Component = (props: IProps) => {
  const {transitions, Child, onAddClick} = props;
  return (
    <Layout>
      <div className="button" onClick={()=> onAddClick()}>add</div>
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
