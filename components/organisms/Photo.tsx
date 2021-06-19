import { css } from '@emotion/css'
import { format, formatDistanceToNow } from 'date-fns'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/modules'
import globalCss from '../../styles/global-css'
import { last } from '../../utils/misc'
import PhotoInfo from '../atoms/PhotoInfo'
import CopyrightInfo from '../molecules/CopyrightInfo'
import PhotoHeader from '../molecules/PhotoHeader'
import TransferOwnershipButton from '../molecules/TransferOwnershipButton'

interface IPhoto {
  id: string
  src: string
}

export default function Photo({ id, src }: IPhoto) {
  const userAddress = useSelector((state: RootState) => state.auth.address)
  const feed = useSelector((state: RootState) => state.photos.feed)
  const [photo] = feed.filter((photo) => photo.id === id)
  const { ownerHistory, timestamp, location, name, caption } = photo
  const [originalOwner] = ownerHistory
  const currentOwner = last(ownerHistory).toLowerCase()
  const issueDate = new Date(timestamp * 1000)
  const issueDateFormat = format(issueDate, 'yyyy-MM-dd')
  const issueDateDistanceToNow = `${formatDistanceToNow(issueDate)} ago`

  return (
    <div className={cssContainer}>
      <div className={cssInfoContainer}>
        <PhotoHeader
          className={cssPhotoHeader}
          currentOwner={currentOwner}
          location={location}
        />
        <img className={cssImage} src={src} alt={name} />
        <PhotoInfo
          className={cssPhotoInfo}
          name={name}
          issueDate={issueDateDistanceToNow}
          caption={caption}
        />
        <div className={cssButtonsContainer}>
          <CopyrightInfo
            id={id}
            originalOwner={originalOwner}
            currentOwner={currentOwner}
          />
          {userAddress === currentOwner && (
            <TransferOwnershipButton
              id={id}
              issueDate={issueDateDistanceToNow}
              currentOwner={currentOwner}
            />
          )}
        </div>
        <div className={cssIssueDateContainer}>{issueDateFormat}</div>
      </div>
    </div>
  )
}

const cssContainer = css`
  width: 100%;
  max-width: ${globalCss.common.maxWidth};
  max-height: 85vh;
  padding: 0 1.25rem;
  margin: auto;

  @media ${globalCss.breakpoint.mobileQuery} {
    padding: 0 2.5rem;
    background-color: ${globalCss.color.white};
  }
  @media ${globalCss.breakpoint.foldQuery} {
    padding: 0;
  }
`

const cssInfoContainer = css`
  display: grid;
  grid-template-columns: auto 20.938rem;
  grid-template-rows: auto 1fr auto auto;
  width: 100%;
  height: 100%;
  background-color: ${globalCss.color.backgroundColor};

  @media ${globalCss.breakpoint.mobileQuery} {
    grid-template-columns: 100%;
  }
`

const cssPhotoHeader = css`
  border-left: 1px solid ${globalCss.color.borderColor};
  border-bottom: 1px solid ${globalCss.color.borderColor};
  grid-column: 2/3;

  @media ${globalCss.breakpoint.mobileQuery} {
    border: 0;
    grid-column: auto;
  }
`

const cssImage = css`
  width: 100%;
  height: 100%;
  max-width: 37.5rem;
  max-height: 85vw;
  object-fit: cover;
  grid-column: 1/2;
  grid-row: 1/5;

  @media ${globalCss.breakpoint.mobileQuery} {
    grid-column: auto;
    grid-row: auto;
  }
`

const cssPhotoInfo = css`
  border-left: 1px solid ${globalCss.color.borderColor};
  border-bottom: 1px solid ${globalCss.color.borderColor};
  grid-column: 2/3;

  @media ${globalCss.breakpoint.mobileQuery} {
    display: none;
  }
`

const cssButtonsContainer = css`
  display: flex;
  border-left: 1px solid ${globalCss.color.borderColor};
  padding: 0.5rem 1rem 0.5rem 1rem;
  grid-column: 2/3;

  button:not(:last-child) {
    margin-right: 0.5rem;
  }

  @media ${globalCss.breakpoint.mobileQuery} {
    border: 0;
    grid-column: auto;
  }
`

const cssIssueDateContainer = css`
  color: ${globalCss.color.colorDown};
  border-left: 1px solid ${globalCss.color.borderColor};
  padding: 0 1rem 1rem 1rem;
  font-size: 0.75rem;
  grid-column: 2/3;

  @media ${globalCss.breakpoint.mobileQuery} {
    border: 0;
    grid-column: auto;
  }
`
