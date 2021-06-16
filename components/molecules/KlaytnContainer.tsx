import { css } from '@emotion/css'
import globalCss from '../../styles/global-css'
import Logo from '../atoms/Logo'

export default function KlaytnContainer({ children }) {

  return (
    <div className={cssKlaytnContainer}>
      <div className={cssContainer}>
        <Logo className={cssLogo} />
      </div>
      <div className={cssContainer}>
        <h2 className={cssSubtitle}>
          Klaytn-based NFT photo licensing application
        </h2>
      </div>
      {children && (
        <div className={cssChildrenContainer}>
          {children}
        </div>
      )}
    </div>
  )
}

const cssKlaytnContainer = css`
  border: 1px solid ${globalCss.color.borderColor};
  background-color: ${globalCss.color.backgroundColor};
  padding: 2rem 3rem;
  margin: auto;
`

const cssContainer = css`
  display: flex;
  justify-content: center;
`

const cssLogo = css`
  font-size: 2rem;

  h1{
    font-size: 2.5rem;
  }
`

const cssSubtitle = css`
  font-size: 1.25rem;
`

const cssChildrenContainer = css`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`
