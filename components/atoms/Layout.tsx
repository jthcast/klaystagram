import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/modules'
import { hideModal } from '../../redux/modules/ui'
import Modal from './Modal'

export default function Layout({ children }) {
  const dispatch = useDispatch()
  const { isOpen = false, content } = useSelector((state: RootState) => state.ui.modal) || {}

  function modalHandling(){
    dispatch(hideModal())
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
    </>
  )
}
