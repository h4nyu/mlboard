import React, {Component} from 'react'
import styled from 'styled-components';

export default class CsvSaveBtn extends React.Component<{}> {
  render = () => {
    return (
      <div className="button">
        <i className="fas fa-file-download"></i>
      </div>
    )
  }
}
