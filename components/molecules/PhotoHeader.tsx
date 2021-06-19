import { css, cx } from '@emotion/css'
import { KLAYTN_SCOPE } from '../../constants/url'
import globalCss from '../../styles/global-css'
import LinkNewTab from '../atoms/LinkNewTab'

interface IPhotoHeader {
  className?: string
  currentOwner: string
  location?: string
}

export default function PhotoHeader({
  className,
  currentOwner,
  location,
}: IPhotoHeader) {
  return (
    <header
      className={cx({ [cssContainer]: true }, { [className]: !!className })}
    >
      <LinkNewTab
        className={cssCurrentOwner}
        link={`${KLAYTN_SCOPE}account/${currentOwner}`}
        title={currentOwner}
      />
      <p className={cssLoation}>{location}</p>
    </header>
  )
}

const cssContainer = css`
  padding: 1rem;
`

const cssCurrentOwner = css`
  font-weight: bold;
  text-decoration: none;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  display: block;
  margin-bottom: 0.125rem;
  color: ${globalCss.color.color};

  &:visited {
    color: ${globalCss.color.color};
  }
`

const cssLoation = css`
  font-size: 0.75rem;
  text-decoration: none;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  display: block;
`
