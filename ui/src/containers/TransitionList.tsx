import React from 'react';
import { Transition } from '~/models'; 
import styled from 'styled-components';
import {IProps as IChildProps} from '~/connectors/Transition';
import { Map } from 'immutable';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: scroll;
`;

const AddIcon = () => (<i className="fas fa-plus"></i>);

interface IProps {
  transitions: Map<string, Transition>;
  onAddClick: () => void;
  Child: React.ComponentType<IChildProps>;
}
const Component = (props: IProps) => {
  const {transitions, Child, onAddClick} = props;
  return (
    <Layout>
      <div className="button" onClick={()=> onAddClick()}>
        <AddIcon/>
      </div>
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
