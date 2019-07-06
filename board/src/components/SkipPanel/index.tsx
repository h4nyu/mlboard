import React, { FormEvent }  from 'react'
import styled from 'styled-components'


const Layout = styled.span`
  display: grid;
  grid-template-areas: "left center right";
  grid-template-columns: auto 1fr auto;
`

const RightArea = styled.span`
  grid-area: right;
`

const CenterArea = styled.span`
  grid-area: center;
`

const LeftArea = styled.span`
  grid-area: left;
`


export interface ISkipPanelProps {
  interval: number
  onShift: (interval: number) => void
  onIntervalChange: (interval: number) => void
}
export default class SkipPanel extends React.Component<ISkipPanelProps> {
  handeInput = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault()
    this.props.onIntervalChange(Number(e.currentTarget.value))
  }
  render = () => {
    const {interval, onShift} = this.props
    return (
      <Layout>
        <LeftArea>
          <a 
            className="button" 
            onClick={() => onShift(interval)}
          >
            <span>
              <i className="fas fa-step-backward"></i>
            </span>
          </a>
        </LeftArea>
        <CenterArea>
          <input
            value={String(interval)}
            className="input"
            onChange={this.handeInput}
            type="number"
          >
          </input>
        </CenterArea>
        <RightArea>
          <a 
            className="button" 
            onClick={() => onShift(-interval)}
          >
            <span>
              <i className="fas fa-step-forward"></i>
            </span>
          </a>
        </RightArea>
      </Layout>
    );
  }
}

