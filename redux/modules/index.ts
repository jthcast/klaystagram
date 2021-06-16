import { combineReducers } from 'redux'
import auth from './auth'
import photos from './photos'
import ui from './ui'
import loading from './loading'


const rootReducer = combineReducers({
  auth,
  photos,
  ui,
  loading
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer