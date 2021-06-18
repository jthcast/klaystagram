import { css } from '@emotion/css'
import * as URL from '../../constants/url'
import globalCss from '../../styles/global-css'
import LinkNewTab from '../atoms/LinkNewTab'

export default function Footer() {
  const footerLinks = [
    { title: `Klaytn Official Site`, link: URL.KLAYTN_HOMEPAGE },
    { title: `Klaytnscope`, link: URL.KLAYTN_SCOPE },
    { title: `Klaytn Wallet`, link: URL.KLAYTN_WALLET },
    { title: `Klaytn Docs`, link: URL.KLAYTN_DOCS },
    { title: `Ground X Official Site`, link: URL.GROUNDX_HOMEPAGE },
    { title: `Jthcast`, link: URL.JTHCAST },
  ]

  return (
    <footer className={cssFooter}>
      <ul className={cssList}>
        {footerLinks.map(({ title, link }) => {
          return (
            <li key={link}>
              <LinkNewTab className={cssLink} link={link} title={title} />
            </li>
          )
        })}
      </ul>
      <p className={cssCopyright}>@ 2021 Klaystagram from Klaytn</p>
    </footer>
  )
}

const cssFooter = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: ${globalCss.common.maxWidth};
  margin: auto auto 0 auto;
  padding: 0 1.25rem 3.25rem 1.25rem;

  @media ${globalCss.breakpoint.mobileQuery} {
    padding: 0rem 1rem 3.25rem 1rem;
  }
`

const cssList = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  list-style: none;
  font-size: 0.75rem;

  li {
    margin: 0 0.5rem 0.75rem 0.5rem;
  }
`

const cssLink = css`
  color: ${globalCss.color.colorDown};
  text-decoration: none;

  &:visited {
    color: ${globalCss.color.colorDown};
  }
`

const cssCopyright = css`
  display: flex;
  justify-content: center;
  color: ${globalCss.color.colorDown};
  font-size: 0.75rem;
`
