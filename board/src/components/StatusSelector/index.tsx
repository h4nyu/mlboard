import React, {FormEvent} from 'react'
import {StatusLevel} from "~/core/enums"


interface IStatusSelectorState {
  selected: number | undefined
}
interface IStatusSelectorProps {
  onChange: (value: StatusLevel) => void
}
export default class StatusSelector extends React.Component<IStatusSelectorProps, IStatusSelectorState> {
  state = {
    selected: undefined
  } 
  handleChange = (e: FormEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const value = Number(e.currentTarget.value) as StatusLevel
    if(this.props.onChange){
      this.props.onChange(value)
    }
  }

  render = () => {
    return (
      <div className="select">
        <select onChange={this.handleChange}>
          <option value={StatusLevel.NOTSET}>正常</option>
          <option value={StatusLevel.WARNING}>警告</option>
          <option value={StatusLevel.ERROR}>警報</option>
        </select>
      </div>
    );
  }
}
