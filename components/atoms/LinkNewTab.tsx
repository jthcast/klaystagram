import { css, cx } from '@emotion/css'
import globalCss from '../../styles/global-css'

interface ILinkNewTab {
  className?: string
  link?: string
  title?: string
}

export default function LinkNewTab({ className, link, title }: ILinkNewTab) {
  return (
    <a
      className={cx({ [cssAnchor]: true }, { [className]: !!className })}
      href={link}
      target="_blank"
      rel="noreferrer noopener"
    >
      {title}
    </a>
  )
}

const cssAnchor = css`
  color: #00376b;
  line-height: 1;

  &:visited {
    color: #00376b;
  }
`
