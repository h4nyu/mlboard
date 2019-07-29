import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  border-style: solid;
  color: palevioletred;
  border-color: red;
  border-width: 1px;
`;

export class Mock extends React.Component {
  render = (): React.ReactElement => {
    return (
      <StyledDiv>
        <span>
          Mock
        </span>
      </StyledDiv>
    );
  }
}
