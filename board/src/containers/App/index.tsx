import React from 'react'
import '@fortawesome/fontawesome-free/css/all.css'
import AppRouter from "~/router/AppRouter";
import TheLoading from '~/connectors/TheLoading'
import TraceLevelFormModal from  '~/connectors/TraceLevelFormModal'
import MaintenanceForm from  '~/connectors/MaintenanceForm'
import MaintenanceCopyFormModal from '~/connectors/MaintenanceCopyFormModal'


interface IAppProps {
  onInit: () => void
}
export default class App extends React.Component<IAppProps> {
  componentDidMount = () => {
    this.props.onInit()
  }

  render = () => {
    return (
      <div>
        <AppRouter />
        <TheLoading />
        <TraceLevelFormModal />
        <MaintenanceForm />
        <MaintenanceCopyFormModal />
      </div>
    )
  }
}
