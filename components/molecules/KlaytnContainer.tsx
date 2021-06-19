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
      {children && <div className={cssChildrenContainer}>{children}</div>}
    </div>
  )
}

const cssKlaytnContainer = css`
  border: 1px solid ${globalCss.color.borderColor};
  background-color: ${globalCss.color.backgroundColor};
  padding: 2rem 3rem;
  margin: auto;
  max-width: 80vw;

  @media ${globalCss.breakpoint.mobileQuery} {
    padding: 1rem 1.5rem;
  }
`

const cssContainer = css`
  display: flex;
  justify-content: center;
`

const cssLogo = css`
  font-size: 2rem;

  h1 {
    font-size: 2.5rem;
  }

  @media ${globalCss.breakpoint.mobileQuery} {
    font-size: 1.4rem;

    h1 {
      font-size: 1.25rem;
    }
  }
`

const cssSubtitle = css`
  font-size: 1.25rem;
  text-align: center;

  @media ${globalCss.breakpoint.mobileQuery} {
    font-size: 1rem;
  }
`

const cssChildrenContainer = css`
  display: flex;
  justify-content: center;
  margin-top: 2rem;

  @media ${globalCss.breakpoint.mobileQuery} {
    margin-top: 1rem;
  }
`
