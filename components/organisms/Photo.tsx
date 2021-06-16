import { css } from '@emotion/css'
import { formatDistanceToNow } from 'date-fns'
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
  const issueDate = formatDistanceToNow(new Date(timestamp * 1000))

  return (
    <div className={cssContainer}>
      <img 
        className={cssImage}
        src={src}
        alt={name}
      />
      <div>
        <PhotoHeader
          currentOwner={currentOwner}
          location={location}
        />
        <PhotoInfo
          name={name}
          issueDate={issueDate}
          caption={caption}
        />
        <CopyrightInfo
          id={id}
          originalOwner={originalOwner}
          currentOwner={currentOwner}
        />
        { userAddress === currentOwner && (
          <TransferOwnershipButton
            id={id}
            issueDate={issueDate}
            currentOwner={currentOwner}
          />
        )}
      </div>
    </div>
  )
}

const cssContainer = css`
  width: 100%;
  max-width: 70vw;
  max-height: 85vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: 0.1rem solid ${globalCss.color.borderColor};
  margin: auto;
`

const cssImage = css`
  width: 100%;
`