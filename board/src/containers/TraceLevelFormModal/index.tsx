import React from 'react'
import styled from 'styled-components'
import TraceLevelForm from '~/connectors/TraceLevelForm'
import Overlay from '~/components/Overlay'

const Layout = styled.div`
  display: grid;
  grid-template-areas:
  "content close"
  "content blank";
  grid-template-columns: 1fr auto;
  grid-template-rows: 1fr auto;
  background-color: white;
  height: 80%;
  width: 80%;
  padding: 1em;
` 

const CloseArea = styled.div`
  grid-area: close;
`

const CotentArea = styled.div`
  grid-area: content;
`
export interface IProps {
  isOpen: boolean
  onClose: () => void
}
export default class TraceLevelFormModal extends React.Component<IProps> {
  render = () => {
    const {isOpen, onClose} = this.props
    return (
      <Overlay isActive={isOpen}>
        <Layout>
          <CloseArea>
            <a className="delete" onClick={onClose}></a>
          </CloseArea>
          <CotentArea>
            <TraceLevelForm />
          </CotentArea>
        </Layout>
      </Overlay>
    );
  }
}

