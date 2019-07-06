import React, { FormEvent } from 'react'


interface ISearchInput {
  placeholder: string | undefined
  onInput: ((text: string) => void) | undefined
}
export default class SearchInput extends React.Component<ISearchInput> {
  static defaultProps = {
    placeholder: "",
    onInput: (text: string) => {},
  }

  onChange = (e: FormEvent<HTMLInputElement>)  => {
    e.preventDefault();
    if(this.props.onInput){
      this.props.onInput(e.currentTarget.value)
    }
  }
  render = () => {
    return (
      <p className="control has-icons-left has-icons-right">
        <input 
          className="input" 
          type="text"
          placeholder={this.props.placeholder}
          onChange={this.onChange}
        >
        </input>
        <span className="icon is-small is-left">
          <i className="fas fa-search"></i>
        </span>
      </p>
    )
  }
}
