import React, {FormEvent} from 'react'
import styled from 'styled-components'

const PlaceHolder = styled.option`
  display: none;
`

export interface IOption {
  id: string
  value: string
}

export interface IProps {
  onChange: (id: string) => void
  options: IOption[]
  selectedId:  string | undefined
  placeholder: string
}
export default class StatusSelector extends React.Component<IProps> {
  handleChange = (e: FormEvent<HTMLSelectElement>) => {
    e.preventDefault();
    this.props.onChange(e.currentTarget.value)
  }

  render = () => {
    const {
      selectedId, 
      onChange, 
      options,
      placeholder
    } = this.props

    console.log(selectedId || "" );
    return (
      <div className="select">
        <select value={selectedId || ""} onChange={this.handleChange}>
          <PlaceHolder key={""} value="">
            {placeholder}
          </PlaceHolder>
          {
            options.map((x:IOption) => (
              <option key={x.id} value={x.id}>{x.value} </option>
            ))
          }
        </select>
      </div>
    );
  }
}

