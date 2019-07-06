import React from 'react'


interface IStatusLampProps {
  status: number
}
export default class StatusLamp extends React.Component<IStatusLampProps> {
  highlighTextStyle = () =>  {
    if (this.props.status >= 40) {
      return 'has-text-danger';
    }else if (this.props.status >= 30) {
      return 'has-text-warning';
    }else if (this.props.status >= 20){
      return 'has-text-primary';
    }else {
      return 'has-text-grey';
    }
  }

  render = () => {
    return (
      <span className={this.highlighTextStyle()}>
        <i className={`fas fa-circle`}></i>
      </span>
    );
  }
}
