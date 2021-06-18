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

  function showDetailModal(event: React.MouseEvent<HTMLImageElement>) {
    const { id, src } = event.currentTarget.dataset

    ui.showModal({
      content: <Photo id={id} src={src} />,
    })
  }

  useEffect(() => {
    if (!feed) {
      dispatch(getFeed())
    }
  }, [dispatch])

  return (
    <div className={cssContainer}>
      {isLoading && <Icon iconName="spinner" spin />}
      {!isLoading && feed && !feed.length && (
        <span>No Photo yet. How about uploading it? 😅</span>
      )}
      {feed?.length && (
        <ul className={cssList}>
          {feed.map(({ id, name, data }) => {
            const imageUrl = drawImageFromBytes(data)

            return (
              <li key={id}>
                <article className={cssPost}>
                  <img
                    className={cssImage}
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
      )}
    </div>
  )
}

const cssContainer = css`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const cssList = css`
  width: 100%;
  list-style: none;
  display: grid;
  gap: 1.75rem;
  grid-template-columns: 1fr 1fr 1fr;

  @media ${globalCss.breakpoint.mobileQuery} {
    gap: 0.125rem;
  }
`

const cssPost = css`
  position: relative;
  width: 100%;
  max-width: 18.313rem;
  padding-bottom: 100%;

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const cssImage = css`
  cursor: pointer;
`
