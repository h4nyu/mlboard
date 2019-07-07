import React from 'react';
import { 
  ITrace 
} from '~/core/models'; 
import styled from 'styled-components';
import {Map} from 'immutable';
import {IProps as IChildProps} from '~/connectors/TraceListItem';

const Layout = styled.div`
  display: flex;
`;

interface IProps {
  traceSet: Map<string, ITrace>;
  Child: React.FC<IChildProps>;
}
export default class TraceList extends React.Component<IProps> {
  render = () => {
    const {traceSet, Child} = this.props;
    return (
      <Layout className='card'>
        {
          traceSet.toList().map(x => (
            <Child
              key={x.id}
              trace={x}
            />
          ))
        }
      </Layout>
    );
  }
}

