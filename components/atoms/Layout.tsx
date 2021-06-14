import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/modules'
import { hideModal } from '../../redux/modules/ui'
import ui from '../../utils/ui'
import Toast from '../molecules/Toast'
import Modal from './Modal'

export default function Layout({ children }) {
  const dispatch = useDispatch()
  const { isOpen = false, content } = useSelector((state: RootState) => state.ui.modal) || {}
  const toast = useSelector((state: RootState) => state.ui.toast)

  function modalHandling(){
    ui.hideModal()
  }

  return (
    <>
      <main>{children}</main>
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
