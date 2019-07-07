import React from 'react'
import '@fortawesome/fontawesome-free/css/all.css'
import AppRouter from "~/router/AppRouter";


interface IProps {
  onInit: () => void
}
export default class App extends React.Component<IProps> {
  componentDidMount = () => {
    this.props.onInit()
  }
  render = () => {
    return (
      <div>
        <AppRouter />
      </div>
    )
  }
}
