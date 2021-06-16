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

export default function Photo({
  id,
  src
}: IPhoto) {
  const userAddress = useSelector((state: RootState) => state.auth.address)
  const feed = useSelector((state: RootState) => state.photos.feed)
  const [photo] = feed.filter((photo) => photo.id === id)
  const { ownerHistory, timestamp, location, name, caption } = photo
  const [originalOwner] = ownerHistory
  const currentOwner = last(ownerHistory).toLowerCase()
  const issueDate = new Date(timestamp * 1000)
  const issueDateFormat = format(issueDate, 'yyyy-MM-dd')
  const issueDateDistanceToNow = formatDistanceToNow(issueDate)

  return (
    <div className={cssContainer}>
      <img 
        className={cssImage}
        src={src}
        alt={name}
      />
      <div className={cssInfoContainer}>
        <PhotoHeader
          currentOwner={currentOwner}
          location={location}
        />
        <PhotoInfo
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
          { userAddress === currentOwner && (
            <TransferOwnershipButton
              id={id}
              issueDate={issueDateDistanceToNow}
              currentOwner={currentOwner}
            />
          )}
        </div>
        <div className={cssIssueDateContainer}>
          {issueDateFormat}
        </div>
      </div>
    </div>
  )
}

const cssContainer = css`
  width: 100%;
  max-width: 70vw;
  max-height: 85vh;
  display: flex;
  background-color: ${globalCss.color.backgroundColor};
  border: 1px solid ${globalCss.color.borderColor};
  margin: auto;
`

const cssImage = css`
  width: 100%;
  max-width: 41.5vw;
`

const cssInfoContainer = css`
  display: flex;
  flex-direction: column;
  width: 20.938rem;
`

const cssButtonsContainer = css`
  display: flex;
  border-left: 1px solid ${globalCss.color.borderColor};
  padding: 1rem;

  button:not(:last-child){
    margin-right: 0.5rem;
  }
`

const cssIssueDateContainer = css`
  color: ${globalCss.color.colorDown};
  border-left: 1px solid ${globalCss.color.borderColor};
  padding: 0 1rem 1rem 1rem;
  font-size: 0.75rem;
`