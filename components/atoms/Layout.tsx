import { useSelector } from 'react-redux'
import { RootState } from '../../redux/modules'
import ui from '../../utils/ui'
import Toast from '../molecules/Toast'
import Header from '../organisms/Header'
import Modal from './Modal'
import Footer from '../molecules/Footer'

export default function Layout({ children }) {
  const { isOpen = false, content } = useSelector((state: RootState) => state.ui.modal) || {}
  const toast = useSelector((state: RootState) => state.ui.toast)

  function modalHandling(){
    ui.hideModal()
  }

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <Modal
        isOpen={isOpen}
        openHandler={modalHandling}
      >
        {content}
      </Modal>
      <Toast toast={toast} />
    </>
  )
}
