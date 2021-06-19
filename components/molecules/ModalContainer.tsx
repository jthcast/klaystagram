import { css } from '@emotion/css'
import globalCss from '../../styles/global-css'

interface IModalContainer {
  title?: string
  children?: React.ReactElement
}

export default function ModalContainer({ title, children }: IModalContainer) {
  return (
    <div className={cssModalContainer}>
      {title && (
        <div className={cssTitleContainer}>
          <h2>{title}</h2>
        </div>
      )}
      {children && <div className={cssChildrenContainer}>{children}</div>}
    </div>
  )
}

const cssModalContainer = css`
  border-radius: 0.75rem;
  background-color: ${globalCss.color.backgroundColor};
  margin: auto;
  min-width: 25rem;
  max-width: 80vw;

  @media ${globalCss.breakpoint.mobileQuery} {
    min-width: auto;
    max-width: 93vw;
  }
`

const cssTitleContainer = css`
  border-bottom: 1px solid ${globalCss.color.borderColor};
  padding: 2rem;
  text-align: center;

  h2 {
    font-size: 1.125rem;
  }
`

const cssChildrenContainer = css`
  display: flex;
  justify-content: center;
  padding: 2rem;

  @media ${globalCss.breakpoint.mobileQuery} {
    padding: 1.25rem;
  }
`
