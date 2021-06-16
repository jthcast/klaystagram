import { css } from '@emotion/css'
import { KLAYTN_SCOPE } from '../../constants/url'
import globalCss from '../../styles/global-css'
import LinkNewTab from '../atoms/LinkNewTab'

interface IPhotoHeader {
  currentOwner: string
  location?: string
}

export default function PhotoHeader({
  currentOwner,
  location
}: IPhotoHeader) {

  return (
    <header className={cssContainer}>
      <LinkNewTab
        className={cssCurrentOwner}
        link={`${KLAYTN_SCOPE}account/${currentOwner}`}
        title={currentOwner}
      />
      <p className={cssLoation}>
        {location}
      </p>
    </header>
  )
}

const cssContainer = css`
  border-left: 1px solid ${globalCss.color.borderColor};
  border-bottom: 1px solid ${globalCss.color.borderColor};
  padding: 1rem;
`

const cssCurrentOwner = css`
  font-weight: bold;
  text-decoration: none;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  display: block;
`

const cssLoation = css`
  font-size: 0.75rem;
  text-decoration: none;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  display: block;
`