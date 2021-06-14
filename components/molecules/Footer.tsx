import * as URL from '../../constants/url'
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
    <footer>
      <ul>
        {footerLinks.map(({ title, link }) => {
          return(
            <li key={link}>
              <LinkNewTab
                link={link}
                title={title}
              />
            </li>
          )
        })}
      </ul>
    </footer>
  )
}
