import React from 'react';
import { 
  ITrace 
} from '~/core/models'; 
import styled from 'styled-components';
import * as styles from '~/styles';
console.log(styles);

const Layout = styled.div`
  display: grid;
  grid-area: content;
  grid-template-areas: 
  "header"
  "value";
  padding: 0.5em;
  &:hover {
    background-color: #EEEEEE;
  };
  ${styles.card}
`;

const Header = styled.div`
  grid-area: header;
  ${styles.text}
`;

const Value = styled.div`
  grid-area: value;
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
        <Header>
          {trace.name}
        </Header>
        <Value>
          {trace.value}
        </Value>
      </Layout>
    );
  }
}
