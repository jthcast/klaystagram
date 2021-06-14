import KlaystagramContract from '../../klaytn/KlaystagramContract'
import { getWallet } from '../../utils/crypto'
import { feedParser } from '../../utils/misc'
import ui from '../../utils/ui'

export interface IFeed {
  id?: number
  ownerHistory?: string
  data?: string
  name?: string
  location?: string
  caption?: string
  timestamp?: number
}

export const SET_FEED = `photos/SET_FEED`

const setFeed = (feed: IFeed[] | IFeed) => ({
  type: SET_FEED,
  payload: { feed }
})

export const getFeed = () => async (dispatch) => {
  const totalPhotoCount = await KlaystagramContract.methods.getTotalPhotoCount().call()
  if(!totalPhotoCount){
    return []
  }

  const feed = []
  for(let i=totalPhotoCount; i>0; i--){
    const photo = KlaystagramContract.methods.getPhoto(i).call()
    feed.push(photo)
  }
  const response = await Promise.all(feed)

  dispatch(setFeed(feedParser(response)))
}

export const updateFeed = (tokenId) => async (dispatch, getState) => {
  const newPhoto = await KlaystagramContract.methods.getPhoto(tokenId).call()
  const { photos: { feed } } = getState()
  const newFeed: IFeed[] = [feedParser(newPhoto), ...feed]
  dispatch(setFeed(newFeed))
}

export const uploadPhoto = (
  file: File,
  fileName: string,
  location: string,
  caption: string
) => (dispatch) => {
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
    try{
      const receipt = await KlaystagramContract.methods.uploadPhoto(hexString, fileName, location, caption).send({
        from: getWallet().address,
        gas: `100000000`
      })
      ui.showToast({
        status: receipt.status ? `success` : `fail`,
        message: `Received receipt! It means your transaction is in Klaytn
        block (#${receipt.blockNumber}) (uploadPhoto)`,
        link: receipt.transactionHash
      })
      const tokenId = receipt.events.PhotoUploaded.returnValues[0]
      dispatch(updateFeed(tokenId))
    }catch(error){
      ui.showToast({
        status: `error`,
        message: error.toString()
      })
    }
  }
}

const initialState = {
  feed: null
}

export default function photosReducer(state = initialState, action){
  switch (action.type) {
    case SET_FEED:
      return {
        ...state,
        feed: action.payload.feed
      }
    default:
      return state
  }
}