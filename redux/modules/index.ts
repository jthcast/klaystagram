import { combineReducers } from 'redux'
import auth from './auth'
import photos from './photos'
import ui from './ui'


const rootReducer = combineReducers({
  auth,
  photos,
  ui
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer