import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  border-style: solid;
  color: palevioletred;
  border-color: red;
  border-width: 1px;
`;

interface IProps {
  name?: string
}
const Component = (props: IProps) => (
  <StyledDiv>
    <span>
      Mock - {props.name}
    </span>
  </StyledDiv>
);
export default Component;
