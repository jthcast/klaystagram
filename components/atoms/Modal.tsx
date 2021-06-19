import { useCallback, useEffect } from 'react'
import { css } from '@emotion/css'
import globalCss from '../../styles/global-css'

interface IModal {
  isOpen?: boolean
  openHandler?: () => void
  onClose?: () => void
  children?: React.ReactElement
  escClose?: boolean
}

const Modal = ({
  isOpen = false,
  openHandler,
  onClose,
  children,
  escClose = true,
}: IModal): React.ReactElement => {
  const openHandling = () => {
    if (openHandler) {
      openHandler()
    }
    if (isOpen === false && onClose) {
      onClose()
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.setProperty('overflow-y', 'hidden')
    } else {
      document.body.style.removeProperty('overflow-y')
    }
  }, [isOpen])

  const keyDownHandling = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === 'Escape' && escClose && isOpen) {
        openHandling()
      }
    },
    [isOpen]
  )

  useEffect(() => {
    window.addEventListener('keydown', keyDownHandling)

    return () => {
      window.removeEventListener('keydown', keyDownHandling)
    }
  }, [keyDownHandling])

  return (
    <div className={cssModal(isOpen)} role="dialog" aria-modal="true">
      {children}
      <div role="presentation" onClick={openHandling} className={cssBackdrop} />
    </div>
  )
}

export default Modal

const cssModal = (isOpen: boolean) => css`
  ${isOpen ? 'display: flex' : 'display: none'};
  z-index: 3;
  width: 100%;
  position: fixed;
  top: 0;
  background-color: ${globalCss.color.backgroundColorReverseOpacityMore};
  flex-direction: column;
  align-items: center;
  transition: opacity 0.3s cubic-bezier(0.19, 1, 0.22, 1);
  height: 100%;
  overflow-y: auto;
`

const cssBackdrop = css`
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: -1;
`
