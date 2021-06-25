import { useSelector } from 'react-redux'
import { RootState } from '../../redux/modules'
import ui from '../../utils/ui'
import Toast from '../molecules/Toast'
import Header from '../organisms/Header'
import Modal from './Modal'
import Footer from '../molecules/Footer'
import { css } from '@emotion/css'
import globalCss from '../../styles/global-css'
import Head from 'next/head'

export default function Layout({ children }) {
  const { isOpen = false, content } =
    useSelector((state: RootState) => state.ui.modal) || {}
  const toast = useSelector((state: RootState) => state.ui.toast)

  function modalHandling() {
    ui.hideModal()
  }

  return (
    <>
      <Head>
        <title>Klaystagram</title>
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
      </Head>
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
    padding: 0 0 1.875rem 0;
  }
`
