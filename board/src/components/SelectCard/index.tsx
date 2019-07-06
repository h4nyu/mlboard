import React, {Component} from 'react'
import styled from 'styled-components';

const Layout = styled.div`
  display: grid;
  grid-template-areas:
    "bar content";
  grid-template-columns: 5px auto;
`
const Bar = styled.div`
  grid-area: bar;
`

const Content = styled.div`
  grid-area: content;
`

interface ISelectCardProps {
  isSelected: boolean
}
export default class SelectCard extends React.Component<ISelectCardProps> {

  render = () => {
    var barClassName = ''
    if(this.props.isSelected){
      barClassName = 'has-background-primary'
    }
    return (
      <Layout>
        <Bar className={barClassName}>
        </Bar>
        <Content>
          {this.props.children}
        </Content>
      </Layout>
    );
  }
}
