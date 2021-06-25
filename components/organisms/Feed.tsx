import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/modules'
import { getFeed } from '../../redux/modules/photos'
import ui from '../../utils/ui'
import { css } from '@emotion/css'
import globalCss from '../../styles/global-css'
import Icon from '../atoms/Icon'
import Photo from './Photo'
import { drawImageFromBytes } from '../../utils/imageUtils'
import caver from '../../klaytn/caver'

export default function Feed() {
  const dispatch = useDispatch()
  const isLoading = useSelector((state: RootState) => state.loading.isLoading)
  const feed = useSelector((state: RootState) => state.photos.feed)
  const [chainId, setChainId] = useState(undefined)
  const description = `Klaytn-based NFT photo licensing application 📸`

  function showDetailModal(event: React.MouseEvent<HTMLImageElement>) {
    const { id, src } = event.currentTarget.dataset

    ui.showModal({
      content: <Photo id={id} src={src} />,
    })
  }

  useEffect(() => {
    async function getChainId() {
      const chainId = await caver.rpc.klay.getChainId()
      setChainId(chainId)
    }

    if (!feed) {
      dispatch(getFeed())
      getChainId()
    }
  }, [dispatch])

  return (
    <div className={cssContainer}>
      {isLoading && <Icon iconName="spinner" spin />}
      {!isLoading && feed && !feed.length && (
        <span>No Photo yet. How about uploading it? 😅</span>
      )}
      {!isLoading && chainId && (
        <>
          <header className={cssChainInfoWrapper}>
            <div className={cssChainImage}>
              <Icon iconName="klaytnLogo" />
            </div>
            <section className={cssChainInfo}>
              <div className={cssChainId}>{chainId}</div>
              <div className={cssDetailInfoForPC}>
                <div>
                  <span className={cssPostsNumber}>{feed.length} </span>
                  <span>posts</span>
                </div>
                <div>{description}</div>
              </div>
            </section>
          </header>
          <div className={cssDetailInfoMobileWrapper}>
            <div className={cssDescriptionMobile}>{description}</div>
            <div className={cssDetailInfoMobile}>
              <span className={cssPostsNumber}>{feed.length}</span>
              <span>posts</span>
            </div>
          </div>
          <div className={cssInfoSeparator}>
            <div className={cssSelectedInfo}>
              <Icon iconName="grid" />
              <span>posts</span>
            </div>
          </div>
        </>
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const cssChainInfoWrapper = css`
  display: flex;
  width: 100%;
  margin-bottom: 2.75rem;

  @media ${globalCss.breakpoint.mobileQuery} {
    padding: 1rem;
    margin: 0;
  }
`

const cssChainImage = css`
  margin-right: 1.875rem;
  padding: 0 5rem;
  font-size: 8rem;
  line-height: 0;

  @media ${globalCss.breakpoint.mobileQuery} {
    font-size: 5rem;
    padding: 0;
  }
`

const cssChainInfo = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  line-height: 1;

  div:not(:last-child) {
    margin-bottom: 1.25rem;
  }
`

const cssChainId = css`
  font-size: 1.75rem;
`

const cssDetailInfoForPC = css`
  @media ${globalCss.breakpoint.mobileQuery} {
    display: none;
  }
`

const cssDetailInfoMobileWrapper = css`
  display: none;

  @media ${globalCss.breakpoint.mobileQuery} {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    font-size: 0.875rem;
  }
`

const cssDescriptionMobile = css`
  width: 100%;
  padding: 0 1rem 1.313rem;
`

const cssDetailInfoMobile = css`
  width: 100%;
  border-top: 1px solid ${globalCss.color.borderColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.75rem 0;
  color: ${globalCss.color.colorDown};
  line-height: 1.4;
`

const cssPostsNumber = css`
  color: ${globalCss.color.color};
  font-weight: bold;
`

const cssInfoSeparator = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 3.25rem;
  border-top: 1px solid ${globalCss.color.borderColor};
  text-transform: uppercase;
  font-size: 0.75rem;
  font-weight: bold;
  line-height: 1;

  div {
    letter-spacing: 1px;
    display: flex;
    align-items: center;
    height: 100%;
  }

  svg {
    margin-right: 0.375rem;
  }
`

const cssSelectedInfo = css`
  margin-top: -1px;
  border-top: 1px solid ${globalCss.color.color};

  @media ${globalCss.breakpoint.mobileQuery} {
    border-top: 0;

    svg {
      font-size: 1.5rem;
      fill: ${globalCss.color.primaryBrandColor};
    }

    span {
      display: none;
    }
  }
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
