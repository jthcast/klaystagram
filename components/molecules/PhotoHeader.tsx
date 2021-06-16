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
  background-color: ${globalCss.color.backgroundColor};
  border-left: 0.1rem solid ${globalCss.color.borderColor};
  border-bottom: 0.1rem solid ${globalCss.color.borderColor};
  overflow-wrap: anywhere;
  padding: 1rem;
`

const cssCurrentOwner = css`
  font-weight: bold;
  text-decoration: none;
`

const cssLoation = css`
  font-size: 0.75rem;
`