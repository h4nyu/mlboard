import React from 'react';
import styled from 'styled-components';

const ToggleOn = (): React.ReactElement => (<i className="far fa-check-square"></i>);
const ToggleOff = (): React.ReactElement => (<i className="far fa-square"></i>);
const Layout = styled.span`
  cursor: pointer;
  display: flex;
  align-items: center;
`;
export interface IProps {
  value: boolean;
  onClick: () => void;
  children?: React.ReactElement | string;
}
const Check = (props: IProps) => {
  const {value, children} = props;
  return (
    <Layout onClick={() => props.onClick()}>
      {value ? <ToggleOn/> : <ToggleOff/>}
      {children}
    </Layout>
  );
};

export default Check;
