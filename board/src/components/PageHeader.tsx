import styled from 'styled-components';
import React from 'react';
import appStyle from '~/styles/app.scss';



const Layout = styled.div`
  background-color: ${appStyle.primary}
  height: 52px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const Brand = styled.span`
  font-family: Impact;
  font-size: 26px;
  padding: 0.5em;
  color: white;
`;

const Btn = styled.div`
  margin: 0.5em;
`;



interface IProps {
  onRefleshClick: () => void;
}
export default (props: IProps) => {
  const {onRefleshClick} = props;
  return (
    <Layout style={{zIndex: 30}}>
      <Brand> 
        MLBOARD
      </Brand>
      <Btn className="button" onClick={onRefleshClick}>
        <span className="icon is-small">
          <i className="fas fa-sync-alt" />
        </span>
      </Btn>
    </Layout>
  );
};

