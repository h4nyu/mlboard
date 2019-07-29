import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  border-style: solid;
  color: palevioletred;
  border-color: red;
  border-width: 1px;
`;

const Component = () => (
  <StyledDiv>
    <span>
      Mock
    </span>
  </StyledDiv>
);
export default Component;
