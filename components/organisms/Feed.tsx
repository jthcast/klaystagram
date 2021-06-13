import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/modules'
import { getFeed } from '../../redux/modules/photos'
import { last } from '../../utils/misc'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { drawImageFromBytes } from '../../utils/imageUtils'
import PhotoHeader from '../molecules/PhotoHeader'
import PhotoInfo from '../atoms/PhotoInfo'
import CopyrightInfo from '../molecules/CopyrightInfo'
import TransferOwnershipButton from '../molecules/TransferOwnershipButton'

export default function Feed() {
  const dispatch = useDispatch()
  const feed = useSelector((state: RootState) => state.photos.feed)
  const userAddress = useSelector((state: RootState) => state.auth.address)
  const [isLoading, setLoading] = useState(false)

  // function getDerivedStateFromProps(nextProps, prevState){ // TODO Q
  //   const isUpdatedFeed = (nextProps.feed !== null) && (nextProps.feed !== prevState.feed)
  //   if(isUpdatedFeed){
  //     return { isLoading: false }
  //   }
  // }

  useEffect(() => {
    if(!feed){
      dispatch(getFeed())
    }
  }, [dispatch])

  return (
    <div>
      <ul>
      {feed?.length
        ? feed.map(({
            id,
            ownerHistory,
            data,
            name,
            location,
            caption,
            timestamp
          }) => {
            const originalOwner = ownerHistory[0]
            const currentOwner = last(ownerHistory)
            const imageUrl = drawImageFromBytes(data)
            const issueDate = formatDistanceToNow(new Date(timestamp * 1000))

            return(
              <li key={id}>
                <article>
                  <PhotoHeader
                    currentOwner={currentOwner}
                    location={location}
                  />
                  <div>
                    <img src={imageUrl} alt={name} />
                  </div>
                  <div>
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
                    {/* { userAddress === currentOwner && (
                      <TransferOwnershipButton
                        // className
                        id={id}
                        issueDate={issueDate}
                        currentOwner={currentOwner}
                      />
                    )} */}
                  </div>
                </article>
              </li>
            )
          })
        : <span>No Photo 😅</span>
      }
      </ul>
    </div>
  )
}
