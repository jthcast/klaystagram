import { combineReducers } from 'redux'
import auth from './auth'
import photos from './photos'
import ui from './ui'
import loading from './loading'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: `root`,
  storage,
  whitelist: [`auth`]
}

const rootReducer = combineReducers({
  auth,
  photos,
  ui,
  loading
})

export type RootState = ReturnType<typeof rootReducer>

export default persistReducer(persistConfig, rootReducer)