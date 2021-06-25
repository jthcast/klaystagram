import KlaystagramContract from '../../klaytn/KlaystagramContract'
import { getWallet } from '../../utils/crypto'
import { feedParser } from '../../utils/misc'
import ui from '../../utils/ui'
import { endLoading, startLoading } from './loading'

export interface IPhoto {
  id?: string
  ownerHistory?: string[]
  data?: string
  name?: string
  location?: string
  caption?: string
  timestamp?: string
}

export const SET_FEED = `photos/SET_FEED`

const setFeed = (feed: IPhoto[] | IPhoto) => ({
  type: SET_FEED,
  payload: { feed },
})

const updateFeed = (tokenId: string) => async (dispatch, getState) => {
  const newPhoto = await KlaystagramContract.methods.getPhoto(tokenId).call()
  const {
    photos: { feed },
  } = getState()
  const newFeed: IPhoto[] = [feedParser(newPhoto), ...feed]
  dispatch(setFeed(newFeed))
}

const updateOwnerAddress =
  (tokenId: string, to: string) => (dispatch, getState) => {
    const {
      photos: { feed },
    } = getState()
    const newFeed = feed.map((photo: IPhoto) => {
      if (photo.id !== tokenId) {
        return photo
      }
      photo.ownerHistory = [...photo.ownerHistory, to]
      return photo
    })
    dispatch(setFeed(newFeed))
  }

export const getFeed = () => async (dispatch) => {
  dispatch(startLoading())
  const totalPhotoCount = await KlaystagramContract.methods
    .getTotalPhotoCount()
    .call()
  if (!totalPhotoCount) {
    setFeed([])
    dispatch(endLoading())
  }

  const feed = []
  for (let i = totalPhotoCount; i > 0; i--) {
    const photo = KlaystagramContract.methods.getPhoto(i).call()
    feed.push(photo)
  }
  const response = await Promise.all(feed)

  dispatch(setFeed(feedParser(response)))
  dispatch(endLoading())
}

export const uploadPhoto =
  (file: File, fileName: string, location: string, caption: string) =>
  (dispatch) => {
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = async () => {
      const buffer = Buffer.from(reader.result as string)
      /**
       * Add prefix `0x` to hexString
       * to recognize hexString as bytes by contract
       */
      const hexString = `0x` + buffer.toString(`hex`)
      ui.showToast({
        status: `pending`,
        message: `Sending a transaction... (uploadPhoto)`,
      })
      try {
        const receipt = await KlaystagramContract.methods
          .uploadPhoto(hexString, fileName, location, caption)
          .send({
            from: getWallet().address,
            gas: `100000000`,
          })
        ui.showToast({
          status: receipt.status ? `success` : `fail`,
          message: `Received receipt! It means your transaction is in Klaytn
        block (#${receipt.blockNumber}) (uploadPhoto)`,
          link: receipt.transactionHash,
        })
        const tokenId = receipt.events.PhotoUploaded.returnValues[0]
        dispatch(updateFeed(tokenId))
      } catch (error) {
        ui.showToast({
          status: `error`,
          message: error.toString(),
        })
      }
    }
  }

export const transferOwnership =
  (tokenId: string, to: string) => async (dispatch) => {
    ui.showToast({
      status: `pending`,
      message: `Sending a transaction... (transferOwnership)`,
    })
    try {
      const receipt = await KlaystagramContract.methods
        .transferOwnership(tokenId, to)
        .send({
          from: getWallet().address,
          gas: `10000000`,
        })
      ui.showToast({
        status: receipt.status ? `success` : `fail`,
        message: `Received receipt! It means your transaction is in Klaytn
      block (#${receipt.blockNumber}) (transferOwnership)`,
        link: receipt.transactionHash,
      })
      dispatch(updateOwnerAddress(tokenId, to))
    } catch (error) {
      ui.showToast({
        status: `error`,
        message: error.toString(),
      })
    }
  }

const initialState = {
  feed: null,
}

export default function photosReducer(state = initialState, action) {
  switch (action.type) {
    case SET_FEED:
      return {
        ...state,
        feed: action.payload.feed,
      }
    default:
      return state
  }
}
