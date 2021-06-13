import KlaystagramContract from '../../klaytn/KlaystagramContract'
import { feedParser } from '../../utils/misc'

export const SET_FEED = `photos/SET_FEED`

const setFeed = (feed) => ({
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