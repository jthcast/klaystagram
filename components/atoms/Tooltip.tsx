import { css, cx } from '@emotion/css'
import globalCss from '../../styles/global-css'

interface ITooltip {
  children?: string | React.ReactElement
  className?: string
  title?: string
}

export default function Tooltip({ children, className, title }: ITooltip) {
  return (
    <div className={cx({ [cssTooltip]: true }, { [className]: !!className })}>
      <header>{title}</header>
      <div className={cssChildren}>{children}</div>
    </div>
  )
}

const cssTooltip = css`
  max-width: 90vw;
  position: absolute;
  color: ${globalCss.color.colorReverse};
  background-color: ${globalCss.color.backgroundColorReverseOpacity};
  border-radius: 0.25rem;
  padding: 1rem;
  transform: translate(-50%, -100%);

  header {
    font-size: 1.25rem;
  }

  @media ${globalCss.breakpoint.mobileQuery} {
    left: 50%;
  }
`

const cssChildren = css`
  overflow-wrap: break-word;
`
