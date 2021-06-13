import { KLAYTN_SCOPE } from '../../constants/url'
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
    <header>
      <LinkNewTab
        link={`${KLAYTN_SCOPE}transactions?account=${currentOwner}`}
        title={currentOwner}
      />
      <p>
        {location}
      </p>
    </header>
  )
}
