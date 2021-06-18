import { useSelector } from 'react-redux'
import { RootState } from '../../redux/modules'
import ui from '../../utils/ui'
import Toast from '../molecules/Toast'
import Header from '../organisms/Header'
import Modal from './Modal'
import Footer from '../molecules/Footer'
import { css } from '@emotion/css'
import globalCss from '../../styles/global-css'

export default function Layout({ children }) {
  const { isOpen = false, content } =
    useSelector((state: RootState) => state.ui.modal) || {}
  const toast = useSelector((state: RootState) => state.ui.toast)

  function modalHandling() {
    ui.hideModal()
  }

  return (
    <>
      <Header />
      <main className={cssContainer}>{children}</main>
      <Footer />
      <Modal isOpen={isOpen} openHandler={modalHandling}>
        {content}
      </Modal>
      <Toast toast={toast} />
    </>
  )
}

const cssContainer = css`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: ${globalCss.common.maxWidth};
  margin: auto;
  padding: 1.875rem 1.25rem;

  @media ${globalCss.breakpoint.mobileQuery} {
    padding: 1rem 0;
  }
`
