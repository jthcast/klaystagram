import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/modules'
import { getFeed } from '../../redux/modules/photos'
import ui from '../../utils/ui'
import { css } from '@emotion/css'
import globalCss from '../../styles/global-css'
import Icon from '../atoms/Icon'
import Photo from './Photo'
import { drawImageFromBytes } from '../../utils/imageUtils'

export default function Feed() {
  const dispatch = useDispatch()
  const isLoading = useSelector((state: RootState) => state.loading.isLoading)
  const feed = useSelector((state: RootState) => state.photos.feed)

  function showDetailModal(event: React.MouseEvent<HTMLImageElement>){
    const { id, src } = event.currentTarget.dataset

    ui.showModal({
      content: <Photo id={id} src={src} />
    })
  }

  useEffect(() => {
    if(!feed){
      dispatch(getFeed())
    }
  }, [dispatch])

  return (
    <div className={cssContainer}>
      {isLoading && <Icon iconName='spinner' spin />}
      {!isLoading && feed && !feed.length && (
        <span>No Photo yet. How about uploading it? 😅</span>
      )}
      {feed?.length &&
        <ul className={cssList} >
          {feed.map(({
            id,
            name,
            data
          }) => {
            const imageUrl = drawImageFromBytes(data)

            return(
              <li key={id}>
                <article className={cssPost}>
                  <img 
                    src={imageUrl}
                    alt={name}
                    onClick={showDetailModal}
                    data-id={id}
                    data-src={imageUrl}
                  />
                </article>
              </li>
            )
          })}
        </ul>
      }
    </div>
  )
}

const cssContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const cssList = css`
  list-style: none;
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr 1fr 1fr;
`

const cssPost = css`
  width: ${globalCss.common.maxWidthImage};
  height: ${globalCss.common.maxWidthImage};

  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`