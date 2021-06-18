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
              <LinkNewTab link={link} title={title} />
            </li>
          )
        })}
      </ul>
    </footer>
  )
}

const cssFooter = css`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: ${globalCss.common.maxWidth};
  margin: auto;
`

const cssList = css`
  display: flex;
  list-style: none;
  font-size: 0.75rem;

  li a {
    color: ${globalCss.color.colorDown};
    text-decoration: none;
  }

  li:not(:last-child) {
    margin-right: 1rem;
  }
`
